import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraficoColumnasComponent } from './grafico-columnas.component';

describe('GraficoColumnasComponent', () => {
  let component: GraficoColumnasComponent;
  let fixture: ComponentFixture<GraficoColumnasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraficoColumnasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraficoColumnasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
