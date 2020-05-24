import { TestBed } from '@angular/core/testing';

import { AdministradoresService } from './servicio-administradores.service';

describe('AdministradoresService', () => {
  let service: AdministradoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdministradoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
