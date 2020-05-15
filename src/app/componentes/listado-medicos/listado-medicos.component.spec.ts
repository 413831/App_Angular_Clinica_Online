import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoMedicosComponent } from './listado-medicos.component';

describe('ListadoMedicosComponent', () => {
  let component: ListadoMedicosComponent;
  let fixture: ComponentFixture<ListadoMedicosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadoMedicosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoMedicosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
