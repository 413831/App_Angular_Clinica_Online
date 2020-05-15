import { TestBed } from '@angular/core/testing';

import { ServicioMedicosService } from './servicio-medicos.service';

describe('ServicioMedicosService', () => {
  let service: ServicioMedicosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioMedicosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
