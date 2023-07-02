import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDashboardEnprocComponent } from './citas-dashboard-enproc.component';

describe('CitasDashboardEnprocComponent', () => {
  let component: CitasDashboardEnprocComponent;
  let fixture: ComponentFixture<CitasDashboardEnprocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasDashboardEnprocComponent]
    });
    fixture = TestBed.createComponent(CitasDashboardEnprocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
