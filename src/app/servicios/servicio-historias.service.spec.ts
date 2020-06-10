import { TestBed } from '@angular/core/testing';

import { ServicioHistoriasService } from './servicio-historias.service';

describe('ServicioHistoriasService', () => {
  let service: ServicioHistoriasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioHistoriasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
