import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPacientesComponent } from './listado-pacientes.component';

describe('ListadoPacientesComponent', () => {
  let component: ListadoPacientesComponent;
  let fixture: ComponentFixture<ListadoPacientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoPacientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
