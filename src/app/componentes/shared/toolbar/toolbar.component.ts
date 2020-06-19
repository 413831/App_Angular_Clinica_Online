import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent implements OnInit {
  public usuario: Usuario;
  public mostrarBarra : boolean = false;

  constructor(private route: ActivatedRoute, private router: Router,
              private servicio: MiservicioService) 
  {
    this.usuario = MiservicioService.usuario;
  }

  ngOnInit(): void
  {

  }

  logout()
  {
    console.log("Cerrar sesion");
    MiservicioService.cerrarSesion();
    this.router.navigate(["/login"]);
    this.mostrarBarra = false;
  }
}
