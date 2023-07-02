import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAgregarAmigoComponent } from './modal-agregar-amigo.component';

describe('ModalAgregarAmigoComponent', () => {
  let component: ModalAgregarAmigoComponent;
  let fixture: ComponentFixture<ModalAgregarAmigoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAgregarAmigoComponent]
    });
    fixture = TestBed.createComponent(ModalAgregarAmigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
