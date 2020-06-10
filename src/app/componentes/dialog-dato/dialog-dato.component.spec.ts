import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDatoComponent } from './dialog-dato.component';

describe('DialogDatoComponent', () => {
  let component: DialogDatoComponent;
  let fixture: ComponentFixture<DialogDatoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogDatoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogDatoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
