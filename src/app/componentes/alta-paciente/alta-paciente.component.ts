import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Paciente } from 'src/app/clases/Paciente';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';

@Component({
  selector: 'app-alta-paciente',
  templateUrl: './alta-paciente.component.html',
  styleUrls: ['./alta-paciente.component.css']
})
export class AltaPacienteComponent implements OnInit {     
  base64textString: string;
  reader: FileReader;
  selectedFile: File;
  imgUrl: string;
  datosPaciente: FormGroup;
  obrasSociales: string[] = ['Galeno', 'OSPERYH', 'OSPSA', 'Medicus','Hospital Italiano'];

  constructor(private _formBuilder: FormBuilder,
              private servicio: PacientesService) 
  {    
    this.datosPaciente = new FormGroup({
      nombre: new FormControl(),
      dni: new FormControl(),
      direccion: new FormControl(),
      telefono: new FormControl(),
      imagen: new FormControl(),
      obraSocial: new FormControl(),
      numeroAfiliado: new FormControl(),
      disponibilidad: new FormControl(),
      imagenDos: new FormControl(),
      email: new FormControl(),
      clave: new FormControl(),
   });
  }

  ngOnInit() {
    // this.datosPaciente = this._formBuilder.group({
    //   dni: ['', Validators.required],
    //   email: ['', Validators.required],
    //   clave: ['', Validators.required]      
    // });
  }

  alta()
  {
    this.servicio.guardarImagen(this.selectedFile, this.base64textString);
    let paciente = Paciente.CrearPaciente(this.nombre.value, this.clave.value, this.dni.value,
                                          this.direccion.value,this.email.value, this.telefono.value,
                                          `imagen/${this.selectedFile.name}`, this.obraSocial.value, 
                                          this.numeroAfiliado.value, this.imagenDos.value);
    this.servicio.descargarImagen(paciente.imagen);
    console.log(paciente);
    //this.servicio.crear(this.paciente);
  }

  onFileSelected(event)
  {
    this.selectedFile = <File>event.target.files[0];
    
    this.reader = new FileReader();
    // Se asocia un mmanejador de evento para el onLoad 
    this.reader.onload = this.parseToBase64.bind(this);
    // Se dispara el evento onLoad guardando el archivo en el reader
    this.reader.readAsBinaryString(this.selectedFile);
    console.log(this.selectedFile);
  }

  parseToBase64(readerEvt) 
  {
    let binaryString = readerEvt.target.result;
    this.base64textString= btoa(binaryString);
  }

  // Solo para test
  upLoad()
  {
    this.servicio.guardarImagen(this.selectedFile, this.base64textString)
                .then(() => this.servicio.descargarImagen(`/imagen/${this.selectedFile.name}`)
                             .then(()=> this.imgUrl = this.servicio.imgSrc))
                .catch( error => console.error(error));
    
  }

  get nombre() { return this.datosPaciente.get('nombre'); }
  get dni() { return this.datosPaciente.get('dni'); }
  get direccion() { return this.datosPaciente.get('direccion'); }
  get telefono() { return this.datosPaciente.get('telefono'); }
  get imagen() { return this.datosPaciente.get('imagen'); }
  get obraSocial() { return this.datosPaciente.get('obraSocial'); }
  get numeroAfiliado() { return this.datosPaciente.get('numeroAfiliado'); }
  get email() { return this.datosPaciente.get('email'); }
  get clave() { return this.datosPaciente.get('clave'); }
  get imagenDos() { return this.datosPaciente.get('imagenDos'); }
  
}
