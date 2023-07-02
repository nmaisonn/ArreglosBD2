import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoPublicacionesComponent } from './catalogo-publicaciones.component';

describe('CatalogoPublicacionesComponent', () => {
  let component: CatalogoPublicacionesComponent;
  let fixture: ComponentFixture<CatalogoPublicacionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoPublicacionesComponent]
    });
    fixture = TestBed.createComponent(CatalogoPublicacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
