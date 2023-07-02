import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPublicacionRealizadaComponent } from './modal-publicacion-realizada.component';

describe('ModalPublicacionRealizadaComponent', () => {
  let component: ModalPublicacionRealizadaComponent;
  let fixture: ComponentFixture<ModalPublicacionRealizadaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalPublicacionRealizadaComponent]
    });
    fixture = TestBed.createComponent(ModalPublicacionRealizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
