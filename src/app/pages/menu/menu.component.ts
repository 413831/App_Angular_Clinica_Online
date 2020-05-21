import { Component, OnInit, Inject } from '@angular/core';
import { Turno } from 'src/app/clases/Turno';
import { Usuario } from 'src/app/clases/Usuario';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DetalleMedicoComponent } from 'src/app/componentes/detalle-medico/detalle-medico.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {  
  private confirmacion: boolean = false;
  private usuario: Usuario;
  private turnos: Turno[];

  constructor(public modificarDialog: MatDialog, public borrarDialog: MatDialog) { }

  ngOnInit(): void 
  {
    this.usuario = JSON.parse(localStorage.getItem('usuario-logueado'));
    this.turnos = JSON.parse(localStorage.getItem('turnos'));
    console.log("Perfil de usuario: "+ typeof this.usuario);
    // Mejorar todo esto
    this.turnos = this.turnos.filter( turno => turno.nombrePaciente === this.usuario.nombre);

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

  baja()
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
    /*
      if(confirmacion)
      {
        this.servicio.borrar(this.usuario);
      }
    */
  }

}

export class DialogOverviewExampleDialog {

  constructor(public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
              @Inject(MAT_DIALOG_DATA) public data: Usuario) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}