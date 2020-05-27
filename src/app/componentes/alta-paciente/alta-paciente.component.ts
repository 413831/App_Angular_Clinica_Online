import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from 'src/app/clases/Paciente';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';
import { Imagen } from '../registro/registro.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MiservicioService } from 'src/app/servicios/miservicio.service';



@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.css']
})
export class AltaPacienteComponent implements OnInit {     
  base64textString: string;
  reader: FileReader;
  selectedFile: File;
  imagen1: Imagen = new Imagen();
  imagen2: Imagen = new Imagen();
  imgUrl1: string;
  imgUrl2: string;
  datosPaciente: FormGroup;
  obrasSociales: string[] = ['Galeno', 'OSPERYH', 'OSPSA', 'Medicus','Hospital Italiano'];

  constructor(private _formBuilder: FormBuilder,
              private servicio: PacientesService,
              private route: ActivatedRoute,
              private router: Router) 
  {    
    this.datosPaciente = new FormGroup({
      nombre: new FormControl(),
      dni: new FormControl(),
      direccion: new FormControl(),
      telefono: new FormControl(),
      obraSocial: new FormControl(),
      numeroAfiliado: new FormControl(),
      imagen: new FormControl(),
      avatar: new FormControl(),
      email: new FormControl(),
      clave: new FormControl(),
   });
  }

  ngOnInit() {
  }

  alta()
  {
    
    let paciente = Paciente.CrearPaciente(this.nombre.value, this.clave.value, this.dni.value,
                                          this.direccion.value,this.email.value, this.telefono.value,
                                          `imagenes/${this.imagen1.nombre}`, this.obraSocial.value, 
                                          this.numeroAfiliado.value, `imagenes/${this.imagen2.nombre}`,'');
    MiservicioService.guardarImagen(this.imagen1.nombre, this.imagen1.base64);
    MiservicioService.guardarImagen(this.imagen2.nombre, this.imagen2.base64);

    console.log(paciente);
    this.servicio.crear(paciente);
    this.router.navigate(["/home"]);
  }

  onFileSelected(event)
  {
    this.selectedFile = <File>event.target.files[0];
    
    this.reader = new FileReader();
    // Se asocia un manejador de evento para el onLoad 
    this.reader.onload = this.parseToBase64.bind(this);
    // Se dispara el evento onLoad guardando el archivo en el reader
    this.reader.readAsBinaryString(this.selectedFile);
    console.log(event.target.id);

     switch(event.target.id)
    {
      case 'imagenUno' : 
        this.imgUrl1 = this.imagen.value;
        break
      case 'imagenDos' : 
        this.imgUrl2 = this.avatar.value;
        break
    }
  }

  parseToBase64(readerEvt) 
  {
    console.log("Parse to base64");
    
    let binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    if(!this.imagen1.nombre)
    {
      this.imagen1.nombre = this.selectedFile.name;
      this.imagen1.base64 = this.base64textString;
    }
    else if(!this.imagen2.nombre)
    {
      this.imagen2.nombre = this.selectedFile.name;
      this.imagen2.base64 = this.base64textString;
    }
    console.log(this.imagen1.nombre );
  }

  // Solo para test
  upLoad(fileName: string, url: string)
  {
   
  }

  get nombre() { return this.datosPaciente.get('nombre'); }
  get dni() { return this.datosPaciente.get('dni'); }
  get direccion() { return this.datosPaciente.get('direccion'); }
  get telefono() { return this.datosPaciente.get('telefono'); }
  get obraSocial() { return this.datosPaciente.get('obraSocial'); }
  get numeroAfiliado() { return this.datosPaciente.get('numeroAfiliado'); }
  get email() { return this.datosPaciente.get('email'); }
  get clave() { return this.datosPaciente.get('clave'); }
  get imagen() { return this.datosPaciente.get('imagen'); }
  get avatar() { return this.datosPaciente.get('avatar'); }
  
}
