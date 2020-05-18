import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorMedicoComponent } from './buscador-medico.component';

describe('BuscadorMedicoComponent', () => {
  let component: BuscadorMedicoComponent;
  let fixture: ComponentFixture<BuscadorMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscadorMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
