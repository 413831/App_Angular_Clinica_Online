import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTurnoComponent } from './info-turno.component';

describe('InfoTurnoComponent', () => {
  let component: InfoTurnoComponent;
  let fixture: ComponentFixture<InfoTurnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoTurnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
