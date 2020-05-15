import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaMedicoComponent } from './alta-medico.component';

describe('AltaMedicoComponent', () => {
  let component: AltaMedicoComponent;
  let fixture: ComponentFixture<AltaMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
