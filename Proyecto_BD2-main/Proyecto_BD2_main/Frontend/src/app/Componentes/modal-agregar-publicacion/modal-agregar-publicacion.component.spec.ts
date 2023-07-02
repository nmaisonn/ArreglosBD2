import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarPublicacionComponent } from './modal-agregar-publicacion.component';

describe('ModalAgregarPublicacionComponent', () => {
  let component: ModalAgregarPublicacionComponent;
  let fixture: ComponentFixture<ModalAgregarPublicacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAgregarPublicacionComponent]
    });
    fixture = TestBed.createComponent(ModalAgregarPublicacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
