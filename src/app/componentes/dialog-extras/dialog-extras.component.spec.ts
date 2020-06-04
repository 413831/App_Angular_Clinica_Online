import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogExtrasComponent } from './dialog-extras.component';

describe('DialogExtrasComponent', () => {
  let component: DialogExtrasComponent;
  let fixture: ComponentFixture<DialogExtrasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogExtrasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogExtrasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
