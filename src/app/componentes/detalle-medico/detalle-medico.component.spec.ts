import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMedicoComponent } from './detalle-medico.component';

describe('DetalleMedicoComponent', () => {
  let component: DetalleMedicoComponent;
  let fixture: ComponentFixture<DetalleMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
