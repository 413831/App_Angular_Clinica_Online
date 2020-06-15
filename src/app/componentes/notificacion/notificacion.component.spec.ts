import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionComponent } from './notificacion.component';

describe('NotificacionComponent', () => {
  let component: NotificacionComponent;
  let fixture: ComponentFixture<NotificacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
