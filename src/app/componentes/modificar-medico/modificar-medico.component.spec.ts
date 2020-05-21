import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMedicoComponent } from './modificar-medico.component';

describe('ModificarMedicoComponent', () => {
  let component: ModificarMedicoComponent;
  let fixture: ComponentFixture<ModificarMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
