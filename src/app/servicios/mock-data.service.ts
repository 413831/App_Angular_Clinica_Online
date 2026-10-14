import { Injectable } from '@angular/core';
import { Medico, Especialidad } from '../clases/Medico';
import { Paciente } from '../clases/Paciente';
import { Administrador } from '../clases/Administrador';
import { Turno, Estado, Dia } from '../clases/Turno';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {

  public static seedIfEmpty(): void {
    const rawMedicos = localStorage.getItem('medicos');
    if (!rawMedicos || rawMedicos === 'null' || JSON.parse(rawMedicos).length === 0) {
      localStorage.setItem('medicos', JSON.stringify(this.getMockMedicos()));
    }

    const rawPacientes = localStorage.getItem('pacientes');
    if (!rawPacientes || rawPacientes === 'null' || JSON.parse(rawPacientes).length === 0) {
      localStorage.setItem('pacientes', JSON.stringify(this.getMockPacientes()));
    }

    const rawAdmins = localStorage.getItem('administradores');
    if (!rawAdmins || rawAdmins === 'null' || JSON.parse(rawAdmins).length === 0) {
      localStorage.setItem('administradores', JSON.stringify(this.getMockAdministradores()));
    }

    const rawTurnos = localStorage.getItem('turnos');
    if (!rawTurnos || rawTurnos === 'null' || JSON.parse(rawTurnos).length === 0) {
      localStorage.setItem('turnos', JSON.stringify(this.getMockTurnos()));
    }
  }

  public static getMockMedicos(): Medico[] {
    const m1 = Medico.CrearMedico(
      'Dr. Antonio Ruedas', 'medico1', 28456123, 'Av. Santa Fe 1840', 'medico1@mail.com',
      1145892341, 'assets/img/doctor.jpg', 45892, 101,
      [Dia.Lunes, Dia.Miercoles, Dia.Viernes], ['09:00', '10:00', '11:00', '14:00', '15:00'],
      [Especialidad.Cardiología, Especialidad.General], 'assets/img/doctor.jpg', '-med1', true
    );

    const m2 = Medico.CrearMedico(
      'Dra. Mariana Valenzuela', 'medico2', 31894562, 'Av. Cabildo 2250', 'medico2@mail.com',
      1167451298, 'assets/img/doctor.jpg', 52140, 102,
      [Dia.Martes, Dia.Jueves, Dia.Sabado], ['10:00', '11:00', '12:00', '13:00'],
      [Especialidad.Pediatría], 'assets/img/doctor.jpg', '-med2', true
    );

    const m3 = Medico.CrearMedico(
      'Dr. Carlos Gómez', 'medico3', 25789123, 'Calle Callao 780', 'medico3@mail.com',
      1123456789, 'assets/img/doctor.jpg', 38941, 103,
      [Dia.Lunes, Dia.Martes, Dia.Jueves], ['14:00', '15:00', '16:00', '17:00'],
      [Especialidad.Traumatología], 'assets/img/doctor.jpg', '-med3', true
    );

    const m4 = Medico.CrearMedico(
      'Dra. Laura Martínez', 'medico4', 33456789, 'Av. Rivadavia 4500', 'medico4@mail.com',
      1189012345, 'assets/img/doctor.jpg', 61203, 104,
      [Dia.Miercoles, Dia.Viernes], ['08:30', '09:30', '10:30', '11:30'],
      [Especialidad.Dermatología], 'assets/img/doctor.jpg', '-med4', true
    );

    return [m1, m2, m3, m4];
  }

  public static getMockPacientes(): Paciente[] {
    const p1 = Paciente.CrearPaciente(
      'Juan Carlos Rodríguez', 'paciente1', 34567890, 'Av. Belgrano 1234', 'paciente1@mail.com',
      1155443322, 'assets/img/doctor.jpg', 'OSDE 310', 445566, 'assets/img/doctor.jpg', '-pac1'
    );

    const p2 = Paciente.CrearPaciente(
      'María Sol Romero', 'paciente2', 37890123, 'Calle Corrientes 3450', 'paciente2@mail.com',
      1177889900, 'assets/img/doctor.jpg', 'Swiss Medical', 778899, 'assets/img/doctor.jpg', '-pac2'
    );

    return [p1, p2];
  }

  public static getMockAdministradores(): Administrador[] {
    const a1 = Administrador.CrearAdministrador(
      'Admin General', 'admin', 99999999, 'Sede Central - Clinica Gago', 'unmail1@mail.com',
      1111111111, 'assets/img/doctor.jpg', 'assets/img/doctor.jpg', '-adm1'
    );
    return [a1];
  }

  public static getMockTurnos(): Turno[] {
    const t1 = Turno.CrearTurno(
      'Juan Carlos Rodríguez', 'Dr. Antonio Ruedas', '14 Oct 2026 00:00:00 GMT', '10:00',
      30, Especialidad.Cardiología, 101, 'Control cardiológico anual', Estado.Atendido,
      '-pac1', '-med1', '-tur1', false, 'Paciente en buen estado, presión arterial 120/80.'
    );

    const t2 = Turno.CrearTurno(
      'María Sol Romero', 'Dra. Mariana Valenzuela', '15 Oct 2026 00:00:00 GMT', '11:00',
      30, Especialidad.Pediatría, 102, 'Control pediátrico semestral', Estado.Aceptado,
      '-pac2', '-med2', '-tur2', false, 'Turno confirmado para consultorio 102.'
    );

    const t3 = Turno.CrearTurno(
      'Juan Carlos Rodríguez', 'Dr. Carlos Gómez', '16 Oct 2026 00:00:00 GMT', '15:00',
      30, Especialidad.Traumatología, 103, 'Dolor en rodilla derecha', Estado.Pendiente,
      '-pac1', '-med3', '-tur3', false, 'Solicitud pendiente de confirmación médica.'
    );

    const t4 = Turno.CrearTurno(
      'María Sol Romero', 'Dra. Laura Martínez', '12 Oct 2026 00:00:00 GMT', '09:30',
      30, Especialidad.Dermatología, 104, 'Consulta preventiva de lunares', Estado.Atendido,
      '-pac2', '-med4', '-tur4', false, 'Revisión general sin novedades.'
    );

    return [t1, t2, t3, t4];
  }
}
