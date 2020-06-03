import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { PacientesService } from 'src/app/servicios/servicio-pacientes.service';
import { MedicosService } from 'src/app/servicios/servicio-medicos.service';
import { Usuario } from 'src/app/clases/Usuario';
import { MiservicioService } from 'src/app/servicios/miservicio.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradoresService } from 'src/app/servicios/servicio-administradores.service';
import { Administrador } from 'src/app/clases/Administrador';
import { Medico, Especialidad } from 'src/app/clases/Medico';
import { Paciente } from 'src/app/clases/Paciente';
import { Dia } from 'src/app/clases/Turno';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public adminTest: Administrador;
  public medicoTest_1: Medico;
  public medicoTest_2: Medico;
  public pacienteTest_1: Paciente;
  public pacienteTest_2: Paciente;
  public usuario: Usuario;
  public datosLogin: FormGroup;
  myRecaptcha = new FormControl(false);
  hide = true;
  medicos: Array<Usuario>;
  pacientes: Array<Usuario>;
  admin: Array<Usuario>;

  constructor(private servicioPacientes: PacientesService,
    private servicioMedicos: MedicosService,
    private servicioAdmin: AdministradoresService,
    private route: ActivatedRoute, private router: Router) 
  {
    this.usuario = new Usuario();
    this.datosLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // Traer al administrador tambien
    this.medicos = this.servicioPacientes.leer();
    this.pacientes = this.servicioMedicos.leer();
    this.admin = this.servicioAdmin.leer();
    // Hardcode para testing
    this.initTest();
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un valor.';
    }

    return this.email.hasError('email') ? 'No es un mail válido.' : '';
  }

  login() {
    MiservicioService.cerrarSesion();
    // Implementar JWT
    let usuarios: Array<Usuario> = new Array<Usuario>();
    usuarios = usuarios.concat(this.medicos).concat(this.pacientes).concat(this.admin);

    console.log(usuarios);

    this.usuario = usuarios.find((usuario) => usuario.email === this.email.value &&
                                  usuario.clave === this.clave.value);
    if (this.usuario) {
      console.info("Login");
      console.log(typeof this.usuario);
      MiservicioService.iniciarSesion(this.usuario);
      this.router.navigate(["home"]);
    }
  }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use!')
  }

  autocomplete(usuarioTest: Usuario)
  {
    this.datosLogin.patchValue({
      email: usuarioTest.email,
      clave: usuarioTest.clave
    })
  }

  initTest()
  {
    this.adminTest = Administrador.CrearAdministrador('Admin','admin', 99999999, 'Test 123', 'unmail1@mail.com',
                                                    11111111111, 'unafoto', 'otrafoto', '0');
    this.pacienteTest_1 = Paciente.CrearPaciente('Paciente_1', 'paciente1', 888888888, 'Direccion 1234', 'paciente1@mail.com',
                                                  1112341234, 'unafoto', 'Cobertura', 12345, 'otrafoto', '0');
    this.pacienteTest_2 = Paciente.CrearPaciente('Paciente_2', 'paciente2', 77777777,'Direccion 4321', 'paciente2@mail.com',
                                                  119876544, 'unafoto', 'Cobertura', 12346, 'otrafoto', '0');
    this.medicoTest_1 = Medico.CrearMedico('Medico_1', 'medico1', 777777777, 'Direccion 222', 'medico1@mail.com',
                                            111426351, 'unafoto', 1010101010, 0, [Dia.Viernes, Dia.Miercoles], ["11:30", "15:00"] ,
                                            [Especialidad.Cardiología, Especialidad.General],
                                            'fotodos', '0');
    this.medicoTest_2 = Medico.CrearMedico('Medico_2', 'medico2', 666666666, 'Direccion 333', 'medico2@mail.com',
                                            1155557776, 'unafoto', 202020202, 0, [Dia.Lunes, Dia.Martes, Dia.Miercoles],
                                            ["11:30", "12:00", "13:00","15:00" ] ,[Especialidad.Pediatría, Especialidad.Traumatología],
                                            'fotodos', '0');
  }

  onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA')
  }

  get email() { return this.datosLogin.get('email'); }
  get clave() { return this.datosLogin.get('clave'); }
  set email(value) { this.datosLogin.get('email').patchValue(value) }
  set clave(value) { this.datosLogin.get('clave').setValue(value) }
}
