import { Component, OnInit, Input, ChangeDetectionStrategy, DoCheck, OnChanges, ChangeDetectorRef  } from '@angular/core';
import { Usuario } from 'src/app/clases/Usuario';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {
  public usuario: Usuario;
  public mostrarBarra : boolean = false;

  constructor(private changeDetector: ChangeDetectorRef,
              private route: ActivatedRoute, private router: Router) 
  {
    
  }

  ngOnInit(): void
  {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    if(this.usuario != null)
    {
      this.mostrarBarra = true;
    }
  }

  ngOnChanges() : void
  {
    this.usuario = JSON.parse(localStorage.getItem("usuario"));

    if(this.usuario != null)
    {
      this.mostrarBarra = true;
    }
  }

  // ngDoCheck() {

  //   let usuario = JSON.parse(localStorage.getItem("usuario"));

  //   // Mucho cuidado con todo esto
  //   if(usuario != null || this.usuario.id != usuario.id){

  //     this.changeDetector.markForCheck();
  //   }
  
  // }

  logout()
  {
    console.log("Cerrar sesion");
    MiservicioService.cerrarSesion();
    this.router.navigate(["/login"]);
    this.mostrarBarra = false;
  }
}
