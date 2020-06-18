import { Component, OnInit } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { Turno } from 'src/app/clases/Turno';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogExtrasComponent } from '../dialog-extras/dialog-extras.component';
import { Historia } from 'src/app/clases/Historia';
import { DialogDatoComponent } from '../dialog-dato/dialog-dato.component';
import { ServicioHistoriasService } from 'src/app/servicios/servicio-historias.service';
import { TurnosService } from 'src/app/servicios/servicio-turnos.service';
import { NotificacionComponent } from '../notificacion/notificacion.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface Dato{
  key: string,
  value: any
}

@Component({
  selector: 'app-alta-historia',
  templateUrl: './alta-historia.component.html',
  styleUrls: ['./alta-historia.component.css']
})
export class AltaHistoriaComponent implements OnInit {
  medico: Medico;
  turno: Turno;
  historia: Historia; 
  edad: number;
  peso: number;
  altura: number;
  sexos: string[] = ["Masculino", "Femenino", "Otro"];
  sexo: string;
  datosExtras: boolean = false;
  extras:Array<Dato> = new Array<Dato>();

  constructor(public nuevoAtributo: MatDialog, public detalleDato: MatDialog,
              private servicioHistoria: ServicioHistoriasService, 
              private servicioTurnos: TurnosService,
              private _snackBar: MatSnackBar) 
  {
    this.medico = Object.assign(new Medico, 
                  JSON.parse(localStorage.getItem('usuario')));  
    this.turno = Object.assign(new Turno, 
      JSON.parse(localStorage.getItem('turno-terminado')));
    // Recuperar historia existente con id del paciente sino crear nueva
    this.historia = JSON.parse(localStorage.getItem('historias'))
                        .filter(historia => historia.id == this.turno.idPaciente)
                        .map(historia => Object.assign(new Historia, historia))[0];
    if(!this.historia)
    {
      this.historia = new Historia(); 
    }
  }

  ngOnInit(): void {
    this.historia.paciente = this.turno.nombrePaciente;
  }

  agregarInfo()
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.extras;
    dialogConfig.width = '300px';
    dialogConfig.height = '250px';
    dialogConfig.panelClass = "dialog";
    const dialogRef = this.nuevoAtributo.open(DialogExtrasComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => 
    {
      if(result)
      {  
        this.extras = result;
        console.log('Datos agregados.');
        
        this.datosExtras = true;
      }
    });

  }

  seleccionar(dato: Dato)
  {
    console.log(dato);
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = dato;
    dialogConfig.width = '350px';
    dialogConfig.height = '250px';
    dialogConfig.panelClass = 'dialog';
    const dialogRef = this.nuevoAtributo.open(DialogDatoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe( result =>{
      if(!result)
      {
        console.log("Dato borrado");
      }
    })
  }

  guardarHistoria()
  {
    // Se agregan los datos extras al objeto Turno
    this.extras.forEach( dato => Turno.AgregarDato(this.turno, dato.key, dato.value));

    if(this.edad)
    {
      Turno.AgregarDato(this.turno, "edad", this.edad);
    }

    if(this.sexo)
    {
      Turno.AgregarDato(this.turno, "sexo", this.sexo);
    }

    if(this.peso)
    {
      Turno.AgregarDato(this.turno, "peso", this.peso);
    }

    if(this.altura)
    {
      Turno.AgregarDato(this.turno, "altura", this.altura);
    }

    console.log(Object.entries(this.turno));

    this.historia.consultas.push(this.turno);
    this.historia.adicionales = this.extras.map( dato => dato.key);
    console.log(this.historia);
    this.servicioTurnos.actualizar(this.turno)
    .then(() => this.servicioHistoria.crear(this.historia));
    ;
    this._snackBar.openFromComponent(NotificacionComponent, {
      duration: 2 * 1000,
      data: "Se actualizó la historia clínica exitosamente."
    });
  }

}
