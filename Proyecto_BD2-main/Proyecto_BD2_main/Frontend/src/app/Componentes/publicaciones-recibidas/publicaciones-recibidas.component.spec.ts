import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacionesRecibidasComponent } from './publicaciones-recibidas.component';

describe('PublicacionesRecibidasComponent', () => {
  let component: PublicacionesRecibidasComponent;
  let fixture: ComponentFixture<PublicacionesRecibidasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublicacionesRecibidasComponent]
    });
    fixture = TestBed.createComponent(PublicacionesRecibidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
