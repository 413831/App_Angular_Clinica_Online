import { Component } from '@angular/core';
import { MiservicioService } from './servicios/miservicio.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
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
}
