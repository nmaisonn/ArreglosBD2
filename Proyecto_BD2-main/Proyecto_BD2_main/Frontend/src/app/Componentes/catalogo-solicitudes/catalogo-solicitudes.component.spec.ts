import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSolicitudesComponent } from './catalogo-solicitudes.component';

describe('CatalogoSolicitudesComponent', () => {
  let component: CatalogoSolicitudesComponent;
  let fixture: ComponentFixture<CatalogoSolicitudesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoSolicitudesComponent]
    });
    fixture = TestBed.createComponent(CatalogoSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
