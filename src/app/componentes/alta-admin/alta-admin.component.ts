import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Usuario, Rol } from 'src/app/clases/Usuario';
import { AdministradoresService } from 'src/app/servicios/servicio-administradores.service';
import { Imagen } from '../registro/registro.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Administrador } from 'src/app/clases/Administrador';

@Component({
  selector: 'app-alta-admin',
  templateUrl: './alta-admin.component.html',
  styleUrls: ['./alta-admin.component.css']
})
export class AltaAdminComponent implements OnInit {  
  private usuario: Usuario;
  public mostrarForm: boolean = false;
  private admin: Administrador;
  hide = true;
  datosAdmin: FormGroup;
  imagen1: Imagen = new Imagen();
  imagen2: Imagen = new Imagen();
  
  constructor(private _formBuilder: FormBuilder,
              private servicio: AdministradoresService,
              private route: ActivatedRoute,
              private router: Router) 
  {
    this.usuario = JSON.parse(localStorage.getItem('usuario-logueado'));

    if(this.usuario != null && this.usuario.rol == Rol.Administrador)
    {
      this.mostrarForm = true;      
    }

    this.datosAdmin = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      dni: new FormControl('', [Validators.required]),
      direccion: new FormControl('', [Validators.required]),
      telefono: new FormControl('', [Validators.required]),
      imagen: new FormControl('', [Validators.required]),
      avatar: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required])
   });
  }

  ngOnInit(): void {
  }

  alta()
  {
    this.admin = Administrador.CrearAdministrador(this.nombre.value, this.clave.value, this.dni.value,
                                                  this.direccion.value, this.email.value, this.telefono.value,
                                                  'imagenes/admin_1.jpg', 'imagenes/admin_2.jpg', '0');
    this.servicio.crear(this.admin);
    this.router.navigate(["/home"]);
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor.';
    }

    return this.email.hasError('email') ? 'Este no es un mail válido.' : '';
  }

  get nombre() { return this.datosAdmin.get('nombre'); }
  get dni() { return this.datosAdmin.get('dni'); }
  get direccion() { return this.datosAdmin.get('direccion'); }
  get telefono() { return this.datosAdmin.get('telefono'); }
  get email() { return this.datosAdmin.get('email'); }
  get clave() { return this.datosAdmin.get('clave'); }

}
