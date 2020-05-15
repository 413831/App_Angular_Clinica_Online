import { TestBed } from '@angular/core/testing';

import { MiservicioService } from './miservicio.service';

describe('MiservicioService', () => {
  let service: MiservicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MiservicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
