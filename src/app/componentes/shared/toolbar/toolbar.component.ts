import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  public usuario: Usuario;
  public mostrarBarra : boolean = false;

  constructor() 
  {
    
  }

  ngOnInit(): void
  {
    this.usuario = JSON.parse(localStorage.getItem("usuario-logueado"));

    if(this.usuario != null)
    {
      this.mostrarBarra = true;
    }
  }

}
