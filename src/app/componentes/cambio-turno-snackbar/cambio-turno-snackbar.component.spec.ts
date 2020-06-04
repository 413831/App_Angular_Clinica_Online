import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambioTurnoSnackbarComponent } from './cambio-turno-snackbar.component';

describe('CambioTurnoSnackbarComponent', () => {
  let component: CambioTurnoSnackbarComponent;
  let fixture: ComponentFixture<CambioTurnoSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambioTurnoSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambioTurnoSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
