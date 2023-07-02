import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasDashboardFinalizadasComponent } from './citas-dashboard-finalizadas.component';

describe('CitasDashboardFinalizadasComponent', () => {
  let component: CitasDashboardFinalizadasComponent;
  let fixture: ComponentFixture<CitasDashboardFinalizadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CitasDashboardFinalizadasComponent]
    });
    fixture = TestBed.createComponent(CitasDashboardFinalizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
