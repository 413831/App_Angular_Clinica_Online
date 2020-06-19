import { Component } from '@angular/core';
import { MiservicioService } from './servicios/miservicio.service';
import { slideInAnimation } from './animation';
import { RouterOutlet } from '@angular/router';
import { Usuario } from './clases/Usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
    // animation triggers go here
  ]
})
export class AppComponent {
  title = 'clinica-online';
  public usuario: Usuario;
  
  constructor() 
  {
    if(!MiservicioService.inicializado)
    {
      MiservicioService.init();
    }
  }

  ngOnChanges(): void{
    this.usuario = JSON.parse(localStorage.getItem('usuario'));
  }

  preparedRoute(outlet: RouterOutlet)
  { 
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

  
}
