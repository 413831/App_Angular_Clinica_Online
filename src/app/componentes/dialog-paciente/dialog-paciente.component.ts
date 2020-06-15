import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/clases/Paciente';
import { Usuario } from 'src/app/clases/Usuario';
import { ServicioHistoriasService } from 'src/app/servicios/servicio-historias.service';
import { MiservicioService } from 'src/app/servicios/miservicio.service';

@Component({
  selector: 'app-dialog-paciente',
  templateUrl: './dialog-paciente.component.html',
  styleUrls: ['./dialog-paciente.component.css']
})
export class DialogPacienteComponent implements OnInit {  
  public usuario: Usuario;
  imgSrc: string;
  avatarSrc: string;

  constructor(public dialogRef: MatDialogRef<DialogPacienteComponent>,
              @Inject(MAT_DIALOG_DATA) public paciente: Paciente,
              private servicioHistorias: ServicioHistoriasService)
  { 
    this.usuario = Object.assign(new Usuario,JSON.parse(localStorage.getItem('usuario')));
  }

  ngOnInit(): void {
    MiservicioService.descargarImagen(this.paciente.imagen)
                      .then( ()=> this.imgSrc = MiservicioService.imgSrc);
    MiservicioService.descargarImagen(this.paciente.avatar)
                      .then( ()=> this.avatarSrc = MiservicioService.imgSrc);    
  }

  verHistoria()
  {

  }

}
