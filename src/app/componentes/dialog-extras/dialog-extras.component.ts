import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Turno } from 'src/app/clases/Turno';

@Component({
  selector: 'app-dialog-extras',
  templateUrl: './dialog-extras.component.html',
  styleUrls: ['./dialog-extras.component.css']
})
export class DialogExtrasComponent implements OnInit {  
  key = 'Dato';
  value = 'Valor';

  constructor(public dialogRef: MatDialogRef<DialogExtrasComponent>,
              @Inject(MAT_DIALOG_DATA) public turno: Turno,
              public confirmacion: MatDialog) 
  { }

  ngOnInit(): void {
  }

  confirmar()
  {
    // Modal confirmando la accion
    const dialogRef = this.confirmacion.open(DialogComponent);

    dialogRef.afterClosed().subscribe(result => 
    {
      if(result)
      {
        console.log('Dato agregado.');
      }
    });
  }

}
