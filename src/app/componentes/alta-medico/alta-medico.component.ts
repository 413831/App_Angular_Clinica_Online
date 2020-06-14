import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';
import { Especialidad, Medico } from 'src/app/clases/Medico';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { Imagen } from '../registro/registro.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { Dia, Turno } from 'src/app/clases/Turno';

@Component({
  selector: 'app-alta-medico',
  templateUrl: './alta-medico.component.html',
  styleUrls: ['./alta-medico.component.css']
})
export class AltaMedicoComponent implements OnInit {
  base64textString: string;
  reader: FileReader;
  selectedFile: File;
  datosMedico: FormGroup;
  medico: Medico;
  imagen1: Imagen = new Imagen();
  imagen2: Imagen = new Imagen();
  imgUrl1: string;
  imgUrl2: string;
  isLinear = false;
  seleccion = new SelectionModel<Especialidad>(true, []);
  franjaHoraria: string[] = ['mañana', 'tarde'];
  public horarios: string[] = Turno.horarios;
  public dias: Dia[] = Turno.dias;
  especialidades = Medico.especialidades
  // public especialidades: Especialidad[];

  constructor(private _formBuilder: FormBuilder,
              private servicio: MedicosService,
              private route: ActivatedRoute,
              private router: Router) {    
    // Se pueden traer las especialidades creadas
    // this.especialidades = servicio.traerEspecialidades();
    this.datosMedico = new FormGroup({
      nombre: new FormControl(),
      dni: new FormControl(),
      direccion: new FormControl(),
      telefono: new FormControl(),
      imagen: new FormControl(),
      avatar: new FormControl(),
      diasAtencion: new FormControl(),
      horasAtencion: new FormControl(),
      email: new FormControl(),
      clave: new FormControl(),
      matricula: new FormControl(),
      especialidad: new FormControl(),
      nuevaEspecialidad: new FormControl(),
   });
  }

  ngOnInit() {
    this.medico = new Medico();
    
  }

  alta()
  {
    let medico = Medico.CrearMedico(this.nombre.value, this.clave.value, this.dni.value,
                                    this.direccion.value,this.email.value, this.telefono.value,
                                    `imagenes/${this.imagen1.nombre}`, this.matricula.value, 0, 
                                    this.diasAtencion.value, this.horasAtencion.value,
                                     this.especialidad.value, `imagenes/${this.imagen1.nombre}`,'');
      MiservicioService.guardarImagen(this.imagen1.nombre, this.imagen1.base64, 
                                      this.nombre.value,this.dni.value);
      MiservicioService.guardarImagen(this.imagen2.nombre, this.imagen2.base64,
                                      this.nombre.value, this.dni.value);
    
    console.log(medico);
    this.servicio.crear(medico);
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

  agregarEspecialidad()
  {
    this.especialidades.push(this.nuevaEspecialidad.value);
    Medico.especialidades = this.especialidades;
  }

  get nombre() { return this.datosMedico.get('nombre'); }
  get dni() { return this.datosMedico.get('dni'); }
  get direccion() { return this.datosMedico.get('direccion'); }
  get telefono() { return this.datosMedico.get('telefono'); }
  get imagen() { return this.datosMedico.get('imagen'); }
  get email() { return this.datosMedico.get('email'); }
  get clave() { return this.datosMedico.get('clave'); }
  get horasAtencion() { return this.datosMedico.get('horasAtencion'); }
  get diasAtencion() { return this.datosMedico.get('diasAtencion'); }
  get avatar() { return this.datosMedico.get('avatar'); }
  get matricula() { return this.datosMedico.get('matricula'); }
  get especialidad() { return this.datosMedico.get('especialidad'); }
  get nuevaEspecialidad() { return this.datosMedico.get('nuevaEspecialidad'); }
}
