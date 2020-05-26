import { Component, OnInit, Inject } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';
import { Usuario } from 'src/app/clases/Usuario';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Medico } from 'src/app/clases/Medico';
import { Paciente } from 'src/app/clases/Paciente';
import { Administrador } from 'src/app/clases/Administrador';
import { DialogComponent } from 'src/app/componentes/dialog/dialog.component';
import { ModificarMedicoComponent } from 'src/app/componentes/modificar-medico/modificar-medico.component';
import { ModificarPacienteComponent } from 'src/app/componentes/modificar-paciente/modificar-paciente.component';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';
import { AdministradoresService } from 'src/app/servicios/servicio-administradores.service';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {  
  public confirmacion: boolean = false;
  public usuario: any;
  public medico: Medico | null;
  public paciente: Paciente | null;
  public administrador: Administrador | null;
  public turnos: Turno[];
  public rol: Rol;
  public imgPerfil: string;
  public imgAvatar: string;

  constructor(public modificarDialog: MatDialog, public borrarDialog: MatDialog,
              public medicosService: MedicosService, public pacienteService: PacientesService,
              public adminService: AdministradoresService,
              public route: ActivatedRoute, public router: Router) 
  { 
    this.usuario = JSON.parse(localStorage.getItem('usuario-logueado'));

    if(this.usuario)
    {
      this.getPerfil(this.usuario);
    }
    // this.turnos = JSON.parse(localStorage.getItem('turnos'));
    // console.log(this.usuario);
    // // Mejorar todo esto
    // this.turnos = this.turnos.filter( turno => turno.nombrePaciente === this.usuario.nombre);
  }

  ngOnInit(): void 
  {
  }

  getPerfil(usuario: any)
  {
    if(usuario.numeroAfiliado)
    { 
      this.paciente = usuario;
      this.rol = Rol.Paciente;
      this.pacienteService.descargarImagen(this.paciente.imagen)
                          .then(()=>  this.imgPerfil = this.pacienteService.imgSrc);
      this.pacienteService.descargarImagen(this.paciente.avatar)
                          .then(()=>  this.imgAvatar = this.pacienteService.imgSrc);
    }
    else if(usuario.matricula)
    {
      this.medico = usuario;
      this.rol = Rol.Medico;
      this.medicosService.descargarImagen(this.medico.imagen)
                          .then(()=>  this.imgPerfil = this.medicosService.imgSrc);
      this.medicosService.descargarImagen(this.medico.avatar)
                          .then(()=>  this.imgAvatar = this.medicosService.imgSrc);
    }
    else
    {
      this.administrador = usuario;
      this.rol = Rol.Administrador;
    }
  }

  modificar()
  {
    // Modal para modificar todos los datos
    // El modal tiene que tener datos precargados
    let dialogConfig = new MatDialogConfig();
    let dialogRef;
    dialogConfig.data = this.usuario;
    dialogConfig.width = '700px';
    dialogConfig.height = '350px';
    dialogConfig.panelClass = "dialog";

    if(this.medico)
    {
      const dialogRef = this.modificarDialog.open(ModificarMedicoComponent, dialogConfig);
    }
    else if(this.paciente)
    {
      const dialogRef = this.modificarDialog.open(ModificarPacienteComponent, dialogConfig);
    }      

    dialogRef.afterClosed().subscribe(result => 
    {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  borrar()
  {
    // Modal confirmando la accion
    const dialogRef = this.borrarDialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      // Cerrar sesion y navegar al home
      if(result)
      {
        switch(this.rol)
        {
          case Rol.Administrador:
            //this.adminService.borrar(this.administrador.id);
            break;
          case Rol.Medico:
            //this.medicosService.borrar(this.medico.id);
            break;
          case Rol.Paciente:
            //this.pacienteService.borrar(this.paciente.id);
            break;
        }
        console.log('Baja realizada.');
        console.log(result);   
      }
    });
  }

  logout()
  {
    MiservicioService.cerrarSesion();
    this.router.navigate(["home"]);
  }

  listarPacientes()
  {

  }

  listarTurnos(){

  }

  altaAdmin(){

  }

  autorizar(){
    
  }


}

export class DialogModificar {

  constructor(public dialogRef: MatDialogRef<DialogModificar>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}

export enum Rol{
  Administrador = 1,
  Medico = 2,
  Paciente = 3
}