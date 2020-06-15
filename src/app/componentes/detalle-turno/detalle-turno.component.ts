import { Component, OnInit, Input } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';
import { MatBottomSheetConfig, MatBottomSheet } from '@angular/material/bottom-sheet';
import { InfoTurnoComponent } from '../info-turno/info-turno.component';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { Medico } from 'src/app/clases/Medico';
import { Usuario } from 'src/app/clases/Usuario';
import { Paciente } from 'src/app/clases/Paciente';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogPacienteComponent } from '../dialog-paciente/dialog-paciente.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogMedicoComponent } from '../dialog-medico/dialog-medico.component';
import { DetalleEncuestaComponent } from '../detalle-encuesta/detalle-encuesta.component';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.css']
})
export class DetalleTurnoComponent implements OnInit {
  @Input() turno:Turno;
  public usuario: Usuario;
  private medico: Medico;
  private paciente: Paciente;
  privados = Turno.atributosNativos;
  atributos: any ;
  imgSrc: string;

  constructor(private _bottomSheet: MatBottomSheet,
              public route: ActivatedRoute,public router: Router,
              public dialogMedico: MatDialog,public dialogPaciente: MatDialog) 
  { 
    
  }

  ngOnInit(): void {
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
    if(this.usuario)
    {
      this.usuario = Object.assign(new Usuario, this.usuario);
      //  Agregar validacion para llamar al servicio
    }
  }

  ngOnChanges(): void{
    if(this.turno)
    {
      // Se busca el medico correspondiente al turno
      this.medico = (JSON.parse(localStorage.getItem('medicos')))
                         .find( medico => medico.id == this.turno.idMedico);
      MiservicioService.descargarImagen(this.medico.imagen)
                      .then( ()=> this.imgSrc = MiservicioService.imgSrc);
      // Se busca el paciente correspondiente al turno
      this.paciente = (JSON.parse(localStorage.getItem('pacientes')))
                         .find( paciente => paciente.id == this.turno.idPaciente);                  
      // Se filtran los datos del turno para mostrar
      this.atributos = Object.entries(this.turno).filter(tuple => {
        return !this.privados.includes(tuple[0]);
      });
    }
  }

  verDetalles()
  {
    let config = new MatBottomSheetConfig()
    config.data = this.turno;

    this._bottomSheet.open(InfoTurnoComponent, config);
  }

  verMedico()
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.medico;
    dialogConfig.width = '400px';
    dialogConfig.height = '500px';
           
    const dialogRef = this.dialogMedico.open(DialogMedicoComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo medico cerrado.');
    });
  }

  verPaciente()
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.paciente;
    dialogConfig.width = '400px';
    dialogConfig.height = '500px';
           
    const dialogRef = this.dialogPaciente.open(DialogPacienteComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo medico cerrado.');
    });
  }

  verEncuesta()
  {
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.paciente;
    dialogConfig.width = '700px';
    dialogConfig.height = '500px';
           
    const dialogRef = this.dialogPaciente.open(DetalleEncuestaComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo medico cerrado.');
    });
  }

  modificar()
  {
    this.router.navigate(["/modificar-turno"]);
  }



}
