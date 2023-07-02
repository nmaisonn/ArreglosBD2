import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitarCitaComponent } from './modal-solicitar-cita.component';

describe('ModalSolicitarCitaComponent', () => {
  let component: ModalSolicitarCitaComponent;
  let fixture: ComponentFixture<ModalSolicitarCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSolicitarCitaComponent]
    });
    fixture = TestBed.createComponent(ModalSolicitarCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
