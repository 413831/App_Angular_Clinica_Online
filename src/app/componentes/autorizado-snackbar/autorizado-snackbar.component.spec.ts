import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizadoSnackbarComponent } from './autorizado-snackbar.component';

describe('AutorizadoSnackbarComponent', () => {
  let component: AutorizadoSnackbarComponent;
  let fixture: ComponentFixture<AutorizadoSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizadoSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizadoSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
