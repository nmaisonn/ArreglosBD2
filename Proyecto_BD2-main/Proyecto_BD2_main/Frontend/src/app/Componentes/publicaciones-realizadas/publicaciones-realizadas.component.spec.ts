import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesRealizadasComponent } from './publicaciones-realizadas.component';

describe('PublicacionesRealizadasComponent', () => {
  let component: PublicacionesRealizadasComponent;
  let fixture: ComponentFixture<PublicacionesRealizadasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicacionesRealizadasComponent]
    });
    fixture = TestBed.createComponent(PublicacionesRealizadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
