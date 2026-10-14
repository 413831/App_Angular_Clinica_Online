import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
import { environment } from '../../../environments/environment';
import { AppService } from 'src/app/servicios/app.service';
import { MockDataService } from 'src/app/servicios/mock-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() enviarUsuario = new EventEmitter<any>();
  public apiKey = environment.captchaKey;
  public adminTest: Administrador;
  public medicoTest_1: Medico;
  public medicoTest_2: Medico;
  public pacienteTest_1: Paciente;
  public pacienteTest_2: Paciente;
  public usuario: Usuario;
  public datosLogin: FormGroup;
  public disabled = false;
  public isLoggingIn = false;
  public loginError = '';
  myRecaptcha = new FormControl(false);
  hide = true;
  medicos: Array<Usuario> = [];
  pacientes: Array<Usuario> = [];
  admin: Array<Usuario> = [];

  constructor(
    private captchaService: AppService,
    private servicioPacientes: PacientesService,
    private servicioMedicos: MedicosService,
    private servicioAdmin: AdministradoresService,
    private route: ActivatedRoute,
    private router: Router,
    public servicioLogin: AppService
  ) {
    this.usuario = new Usuario();
    this.datosLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.initTest();
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    MockDataService.seedIfEmpty();

    try {
      const rawM = localStorage.getItem('medicos');
      this.medicos = rawM ? JSON.parse(rawM).map(data => Object.assign(new Medico(), data)) : [];
    } catch (e) {
      this.medicos = MockDataService.getMockMedicos();
    }

    try {
      const rawP = localStorage.getItem('pacientes');
      this.pacientes = rawP ? JSON.parse(rawP).map(data => Object.assign(new Paciente(), data)) : [];
    } catch (e) {
      this.pacientes = MockDataService.getMockPacientes();
    }

    try {
      const rawA = localStorage.getItem('administradores');
      this.admin = rawA ? JSON.parse(rawA).map(data => Object.assign(new Administrador(), data)) : [];
    } catch (e) {
      this.admin = MockDataService.getMockAdministradores();
    }
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debe ingresar un email.';
    }
    return this.email.hasError('email') ? 'No es un email válido.' : '';
  }

  login() {
    this.loginError = '';
    let usuarios: Array<Usuario> = [];
    usuarios = usuarios
      .concat(this.medicos)
      .concat(this.pacientes)
      .concat(this.admin)
      .concat([this.adminTest, this.medicoTest_1, this.medicoTest_2, this.pacienteTest_1, this.pacienteTest_2]);

    const emailValue = (this.email.value || '').trim().toLowerCase();
    const claveValue = (this.clave.value || '').trim();

    this.usuario = usuarios.find(
      (u) => u && u.email && u.email.toLowerCase() === emailValue && u.clave === claveValue
    );

    if (this.usuario) {
      this.isLoggingIn = true;
      MiservicioService.iniciarSesion(this.usuario, this.servicioLogin)
        .then(() => {
          this.enviarUsuario.emit(this.usuario);
          setTimeout(() => {
            this.router.navigate(['/menu']);
          }, 400);
        })
        .catch(() => {
          this.isLoggingIn = false;
          this.router.navigate(['/menu']);
        });
    } else {
      this.loginError = 'Usuario o contraseña incorrectos. Seleccione un perfil de prueba a continuación.';
    }
  }

  autocomplete(usuarioTest: Usuario) {
    if (!usuarioTest) return;
    this.datosLogin.patchValue({
      email: usuarioTest.email,
      clave: usuarioTest.clave
    });
    this.loginError = '';
  }

  loginDirecto(usuarioTest: Usuario) {
    this.autocomplete(usuarioTest);
    this.login();
  }

  initTest() {
    this.adminTest = Administrador.CrearAdministrador(
      'Admin General', 'admin', 99999999, 'Test 123', 'unmail1@mail.com',
      11111111111, 'assets/img/doctor.jpg', 'assets/img/doctor.jpg', '0'
    );

    this.pacienteTest_1 = Paciente.CrearPaciente(
      'Juan Carlos Rodríguez', 'paciente1', 34567890, 'Direccion 1234', 'paciente1@mail.com',
      1112341234, 'assets/img/doctor.jpg', 'OSDE 310', 12345, 'assets/img/doctor.jpg', '0'
    );

    this.pacienteTest_2 = Paciente.CrearPaciente(
      'María Sol Romero', 'paciente2', 37890123, 'Direccion 4321', 'paciente2@mail.com',
      119876544, 'assets/img/doctor.jpg', 'Swiss Medical', 12346, 'assets/img/doctor.jpg', '0'
    );

    this.medicoTest_1 = Medico.CrearMedico(
      'Dr. Antonio Ruedas', 'medico1', 28456123, 'Direccion 222', 'medico1@mail.com',
      111426351, 'assets/img/doctor.jpg', 1010101010, 101, [Dia.Viernes, Dia.Miercoles], ['11:30', '15:00'],
      [Especialidad.Cardiología, Especialidad.General], 'assets/img/doctor.jpg', '0', true
    );

    this.medicoTest_2 = Medico.CrearMedico(
      'Dra. Mariana Valenzuela', 'medico2', 31894562, 'Direccion 333', 'medico2@mail.com',
      1155557776, 'assets/img/doctor.jpg', 202020202, 102, [Dia.Lunes, Dia.Martes, Dia.Miercoles],
      ['11:30', '12:00', '13:00', '15:00'], [Especialidad.Pediatría, Especialidad.Traumatología],
      'assets/img/doctor.jpg', '0', true
    );
  }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded');
  }

  onScriptError() {
    console.log('reCAPTCHA skipped for local portfolio environment');
  }

  async resolved(captchaResponse: string) {
    this.disabled = false;
  }

  get email() { return this.datosLogin.get('email'); }
  get clave() { return this.datosLogin.get('clave'); }
}
