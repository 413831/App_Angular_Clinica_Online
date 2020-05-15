import { TestBed } from '@angular/core/testing';

import { ServicioPacientesService } from './servicio-pacientes.service';

describe('ServicioPacientesService', () => {
  let service: ServicioPacientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioPacientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
