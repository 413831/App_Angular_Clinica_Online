import { TestBed } from '@angular/core/testing';

import { ServicioTurnosService } from './servicio-turnos.service';

describe('ServicioTurnosService', () => {
  let service: ServicioTurnosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioTurnosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
