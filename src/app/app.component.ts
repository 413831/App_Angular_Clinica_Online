import { Component } from '@angular/core';
import { MiservicioService } from './servicios/miservicio.service';
import { slideInAnimation } from './animation';
import { RouterOutlet } from '@angular/router';

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
  
  constructor(private servicio: MiservicioService) 
  {
    if(!this.servicio.inicializado)
    {
      this.servicio.init();
    }
  }

  preparedRoute(outlet: RouterOutlet)
  { 
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
