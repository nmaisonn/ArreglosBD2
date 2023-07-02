import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDashboardPendsComponent } from './citas-dashboard-pends.component';

describe('CitasDashboardPendsComponent', () => {
  let component: CitasDashboardPendsComponent;
  let fixture: ComponentFixture<CitasDashboardPendsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasDashboardPendsComponent]
    });
    fixture = TestBed.createComponent(CitasDashboardPendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
