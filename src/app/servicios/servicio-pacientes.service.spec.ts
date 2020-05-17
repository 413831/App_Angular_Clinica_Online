import { TestBed } from '@angular/core/testing';

import { PacientesService } from './servicio-pacientes.service';

describe('PacientesService', () => {
  let service: PacientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PacientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
