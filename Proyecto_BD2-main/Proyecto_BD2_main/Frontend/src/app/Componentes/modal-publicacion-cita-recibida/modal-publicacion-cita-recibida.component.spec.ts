import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPublicacionCitaRecibidaComponent } from './modal-publicacion-cita-recibida.component';

describe('ModalPublicacionCitaRecibidaComponent', () => {
  let component: ModalPublicacionCitaRecibidaComponent;
  let fixture: ComponentFixture<ModalPublicacionCitaRecibidaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPublicacionCitaRecibidaComponent]
    });
    fixture = TestBed.createComponent(ModalPublicacionCitaRecibidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
