import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Turno } from 'src/app/clases/Turno';
import { Dato } from '../alta-historia/alta-historia.component';

@Component({
  selector: 'app-dialog-extras',
  templateUrl: './dialog-extras.component.html',
  styleUrls: ['./dialog-extras.component.css']
})
export class DialogExtrasComponent implements OnInit {  
  key = 'Dato';
  value = 'Valor';

  constructor(public datosExtras: MatDialogRef<DialogExtrasComponent>,
              @Inject(MAT_DIALOG_DATA) public extras: Array<Dato>,
              public confirmacion: MatDialog) 
  { }

  ngOnInit(): void {
  }

  agregar()
  {
    // Modal confirmando la accion
    const dialogRef = this.confirmacion.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => 
    {
      if(result)
      { 
        this.extras.push({key: this.key, value: this.value});
        
        this.key = null;
        this.value = null;
      }
    });
  }

  confirmar()
  {
    this.datosExtras.close(this.extras);
  }


}
