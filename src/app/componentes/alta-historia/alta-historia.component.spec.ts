import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaHistoriaComponent } from './alta-historia.component';

describe('AltaHistoriaComponent', () => {
  let component: AltaHistoriaComponent;
  let fixture: ComponentFixture<AltaHistoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaHistoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaHistoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
