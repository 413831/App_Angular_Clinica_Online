import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { Medico } from 'src/app/clases/Medico';

@Component({
  selector: 'app-autorizado-snackbar',
  templateUrl: './autorizado-snackbar.component.html',
  styleUrls: ['./autorizado-snackbar.component.css']
})
export class AutorizadoSnackbarComponent implements OnInit {

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: Medico) { }

  ngOnInit(): void {
  }

}
