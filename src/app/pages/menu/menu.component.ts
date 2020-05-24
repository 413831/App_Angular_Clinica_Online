import { Component, OnInit, Inject } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';
import { Usuario } from 'src/app/clases/Usuario';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMedicoComponent } from 'src/app/componentes/detalle-medico/detalle-medico.component';
import { Medico } from 'src/app/clases/Medico';
import { Paciente } from 'src/app/clases/Paciente';
import { Administrador } from 'src/app/clases/Administrador';

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

  constructor(public modificarDialog: MatDialog, public borrarDialog: MatDialog) { 
    this.usuario = JSON.parse(localStorage.getItem('usuario-logueado'));
    
    this.getPerfil(this.usuario);
    // this.turnos = JSON.parse(localStorage.getItem('turnos'));
    // console.log(this.usuario);
    // // Mejorar todo esto
    // this.turnos = this.turnos.filter( turno => turno.nombrePaciente === this.usuario.nombre);
  }

  ngOnInit(): void 
  {
  }

  modificar(){
    // Modal para modificar todos los datos
    // El modal tiene que tener datos precargados
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.usuario;
    dialogConfig.width = '250px';
           
    const dialogRef = this.modificarDialog.open(DialogOverviewExampleDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  getPerfil(usuario: any){
    if(usuario.numeroAfiliado)
    { 
      this.paciente = usuario;
    }
    else if(usuario.matricula)
    {
      this.medico = usuario
    }
    else
    {
      this.administrador = usuario;
    }
  }


  borrar()
  {
    // Modal confirmando la accion
    let dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.usuario;
    dialogConfig.width = '250px';
           
    const dialogRef = this.borrarDialog.open(DialogOverviewExampleDialog, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // Cerrar sesion y navegar al home
      console.log('Baja realizada.');
      console.log(result);
    });
    
  }

}

export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}