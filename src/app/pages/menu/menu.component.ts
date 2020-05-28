import { Component, OnInit, Inject } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';
import { Usuario, Rol } from 'src/app/clases/Usuario';
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
  public rol: Rol;
  public imgPerfil: string;
  public imgAvatar: string;
  public turnos: Turno[];
  public listadoMedicos: Medico[];
  public listadoPacientes: Paciente[];
  public mostrarPacientes: boolean = false;
  public mostrarMedicos: boolean = true;

  constructor(public modificarDialog: MatDialog, public borrarDialog: MatDialog,
              public medicosService: MedicosService, public pacienteService: PacientesService,
              public adminService: AdministradoresService,
              public route: ActivatedRoute, public router: Router) 
  { 
    this.usuario = JSON.parse(localStorage.getItem('usuario-logueado'));

    if(this.usuario)
    {
      this.obtenerPerfil();
      this.obtenerTurnos();
    }
  }

  ngOnInit(): void 
  {
  }

  obtenerPerfil()
  {

    switch(this.usuario.rol)
    {
      case Rol.Administrador:
        this.administrador = <Administrador>this.usuario;
        this.listadoMedicos = JSON.parse(localStorage.getItem('medicos'))
                                  .filter( medico => !medico.autorizado );
        this.listadoPacientes = JSON.parse(localStorage.getItem('pacientes'));
        break;
      case Rol.Medico:
        this.medico = <Medico>this.usuario;
        
        break;
      case Rol.Paciente:
        this.paciente = <Paciente>this.usuario;
        break;                 
    }

    MiservicioService.descargarImagen(this.usuario.imagen)
                      .then(()=>  this.imgPerfil = MiservicioService.imgSrc);
    MiservicioService.descargarImagen(this.usuario.avatar)
                      .then(()=>  this.imgAvatar = MiservicioService.imgSrc);
  }

  obtenerTurnos()
  {
    switch(this.usuario.rol)
    {     
      case Rol.Medico: 
        this.turnos = JSON.parse(localStorage.getItem('turnos'))
                      .filter( turno => this.medico.nombre == turno.nombreMedico);
        break;
      case Rol.Paciente:
        this.turnos = JSON.parse(localStorage.getItem('turnos'))
                      .filter( turno => this.paciente.nombre == turno.nombrePaciente);
        break;                 
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

    switch(this.usuario.rol)
    {
      // case Rol.Administrador:
      //   this.administrador = <Administrador>usuario;
      //   break;
      case Rol.Medico:
        dialogRef = this.modificarDialog.open(ModificarMedicoComponent, dialogConfig);
        break;
      case Rol.Paciente:
        dialogRef = this.modificarDialog.open(ModificarPacienteComponent, dialogConfig);
        break; 
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
        // Mejorar todo esto y conectar servicio correspondiente segun Rol
        switch(this.usuario.rol)
        {
          case Rol.Administrador:
            this.adminService.borrar(this.administrador.id);
            break;
          case Rol.Medico:
            this.medicosService.borrar(this.medico.id);
            break;
          case Rol.Paciente:
            this.pacienteService.borrar(this.paciente.id);
            break;                   
        }
        console.log('Baja realizada.');
        console.log(result); 
        this.logout();
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

  autorizar(medico: Medico)
  {
    //Aca se tiene que mostrar los datos del medico
    //Tambien un boton para cambiar el estado de autorizado
  }


}

export class DialogModificar {

  constructor(public dialogRef: MatDialogRef<DialogModificar>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
