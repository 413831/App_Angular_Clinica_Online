import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogExtrasComponent } from '../dialog-extras/dialog-extras.component';
import { Dato } from '../alta-historia/alta-historia.component';

@Component({
  selector: 'app-dialog-dato',
  templateUrl: './dialog-dato.component.html',
  styleUrls: ['./dialog-dato.component.css']
})
export class DialogDatoComponent implements OnInit {
  auxiliar: Dato;

  constructor(public datosExtras: MatDialogRef<DialogExtrasComponent>,
              @Inject(MAT_DIALOG_DATA) public dato: Dato) 
  {
    this.auxiliar = dato;
  }

  ngOnInit(): void {
  }

  guardar()
  {
    this.dato = this.auxiliar;
    this.cerrar();
  }

  borrar()
  {
    this.dato = null;
    this.cerrar();
  }

  cerrar()
  {
    this.datosExtras.close(this.dato);
  }



}
