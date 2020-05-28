import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogPacienteComponent } from './dialog-paciente.component';

describe('DialogPacienteComponent', () => {
  let component: DialogPacienteComponent;
  let fixture: ComponentFixture<DialogPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
