import { Component, OnInit, Input, Inject } from '@angular/core';
import { Paciente } from 'src/app/clases/Paciente';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-modificar-paciente',
  templateUrl: './modificar-paciente.component.html',
  styleUrls: ['./modificar-paciente.component.css']
})
export class ModificarPacienteComponent implements OnInit {
  @Input() paciente: Paciente;
  datosPaciente: FormGroup;
  
  constructor(public dialogRef: MatDialogRef<ModificarPacienteComponent>,
              @Inject(MAT_DIALOG_DATA) public usuario: Paciente,
              private route: ActivatedRoute, private router: Router,
              private servicio: PacientesService,
              public confirmacion: MatDialog) 
  { 
    this.datosPaciente = new FormGroup({
      nombre: new FormControl({value: this.usuario.nombre, disabled: true}),
      dni: new FormControl({value: this.usuario.dni, disabled: true}),
      numeroAfiliado: new FormControl({value: this.usuario.numeroAfiliado}),
      obraSocial: new FormControl({value: this.usuario.telefono}),
      direccion: new FormControl({value: this.usuario.direccion}),
      telefono: new FormControl({value: this.usuario.telefono}),
    });
  }

  ngOnInit(): void {
  }

  modificar()
  {
    this.usuario.direccion = this.direccion.value;
    this.usuario.telefono = this.telefono.value;
    this.usuario.numeroAfiliado = this.numeroAfiliado.value;
    this.usuario.obraSocial = this.obraSocial.value;

    console.log(`Usuario modificado ${this.usuario}`)
    const dialogRef = this.confirmacion.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      //this.servicio.actualizar(this.usuario);
    });   
  }

  get nombre() { return this.datosPaciente.get('nombre'); }
  get dni() { return this.datosPaciente.get('dni'); }
  get matricula() { return this.datosPaciente.get('matricula'); }
  get direccion() { return this.datosPaciente.get('direccion'); }
  get telefono() { return this.datosPaciente.get('telefono'); }
  get obraSocial() { return this.datosPaciente.get('obraSocial'); }
  get numeroAfiliado() { return this.datosPaciente.get('numeroAfiliado'); }
}
