import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogMedicoComponent } from './dialog-medico.component';

describe('DialogMedicoComponent', () => {
  let component: DialogMedicoComponent;
  let fixture: ComponentFixture<DialogMedicoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogMedicoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
