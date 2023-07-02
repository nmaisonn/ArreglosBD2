import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoUsuarioItemComponent } from './catalogo-usuario-item.component';

describe('CatalogoUsuarioItemComponent', () => {
  let component: CatalogoUsuarioItemComponent;
  let fixture: ComponentFixture<CatalogoUsuarioItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogoUsuarioItemComponent]
    });
    fixture = TestBed.createComponent(CatalogoUsuarioItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
