import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarTurnoComponent } from './modificar-turno.component';

describe('ModificarTurnoComponent', () => {
  let component: ModificarTurnoComponent;
  let fixture: ComponentFixture<ModificarTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModificarTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
