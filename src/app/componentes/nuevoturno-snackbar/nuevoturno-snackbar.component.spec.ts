import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoturnoSnackbarComponent } from './nuevoturno-snackbar.component';

describe('NuevoturnoSnackbarComponent', () => {
  let component: NuevoturnoSnackbarComponent;
  let fixture: ComponentFixture<NuevoturnoSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevoturnoSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevoturnoSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
