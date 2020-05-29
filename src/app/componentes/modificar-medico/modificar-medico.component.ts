import { Component, OnInit, Input, Inject } from '@angular/core';
import { Medico } from 'src/app/clases/Medico';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogMedicoComponent } from '../dialog-medico/dialog-medico.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { DialogComponent } from '../dialog/dialog.component';
import { Turno, Dia } from 'src/app/clases/Turno';

@Component({
  selector: 'app-modificar-medico',
  templateUrl: './modificar-medico.component.html',
  styleUrls: ['./modificar-medico.component.css']
})
export class ModificarMedicoComponent implements OnInit {
  @Input() medico: Medico;
  datosMedico: FormGroup;
  public horarios: string[] = Turno.horarios;
  public dias: Dia[] = Turno.dias;

  constructor( public dialogRef: MatDialogRef<ModificarMedicoComponent>,
                @Inject(MAT_DIALOG_DATA) public usuario: Medico,
                private route: ActivatedRoute, private router: Router,
                private servicio: MedicosService,
                public confirmacion: MatDialog) { 
    this.datosMedico = new FormGroup({
      nombre: new FormControl({value: this.usuario.nombre, disabled: true}),
      dni: new FormControl({value: this.usuario.dni, disabled: true}),
      matricula: new FormControl({value: this.usuario.matricula, disabled: true}),
      direccion: new FormControl({value: this.usuario.direccion, disabled: false}),
      telefono: new FormControl({value: this.usuario.telefono, disabled: false}),
      diasAtencion: new FormControl({value: this.usuario.diasAtencion, disabled: false}),
      horasAtencion: new FormControl({value: this.usuario.horasAtencion, disabled: false}),
      consultorio: new FormControl({value: this.usuario.consultorio, disabled: false})
    });
  }

  ngOnInit(): void {}

  modificar()
  { 
    this.usuario.direccion = this.direccion.value;
    this.usuario.telefono = this.telefono.value;
    this.usuario.diasAtencion = this.diasAtencion.value;
    this.usuario.horasAtencion = this.horasAtencion.value;
    this.usuario.consultorio = this.consultorio.value;

    console.log(`Usuario modificado ${this.usuario}`)
    const dialogRef = this.confirmacion.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //this.servicio.actualizar(this.usuario);
      this.dialogRef.close();
    });    
  }

  get nombre() { return this.datosMedico.get('nombre'); }
  get dni() { return this.datosMedico.get('dni'); }
  get matricula() { return this.datosMedico.get('matricula'); }
  get direccion() { return this.datosMedico.get('direccion'); }
  get telefono() { return this.datosMedico.get('telefono'); }
  get diasAtencion() { return this.datosMedico.get('diasAtencion'); }
  get horasAtencion() { return this.datosMedico.get('horasAtencion'); }
  get consultorio() { return this.datosMedico.get('consultorio'); }
}
