import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmigoPerfilComponent } from './amigo-perfil.component';

describe('AmigoPerfilComponent', () => {
  let component: AmigoPerfilComponent;
  let fixture: ComponentFixture<AmigoPerfilComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmigoPerfilComponent]
    });
    fixture = TestBed.createComponent(AmigoPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
