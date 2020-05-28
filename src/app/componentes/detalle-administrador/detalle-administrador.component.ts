import { Component, OnInit, Input } from '@angular/core';
import { Administrador } from 'src/app/clases/Administrador';

@Component({
  selector: 'app-detalle-administrador',
  templateUrl: './detalle-administrador.component.html',
  styleUrls: ['./detalle-administrador.component.css']
})
export class DetalleAdministradorComponent implements OnInit {
  @Input() imgPerfil: string;
  @Input() imgAvatar: string;
  @Input() administrador: Administrador;
  imgSrc: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
