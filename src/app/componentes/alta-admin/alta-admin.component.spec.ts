import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaAdminComponent } from './alta-admin.component';

describe('AltaAdminComponent', () => {
  let component: AltaAdminComponent;
  let fixture: ComponentFixture<AltaAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
