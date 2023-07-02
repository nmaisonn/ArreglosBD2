import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmigosComponent } from './amigos.component';

describe('AmigosComponent', () => {
  let component: AmigosComponent;
  let fixture: ComponentFixture<AmigosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmigosComponent]
    });
    fixture = TestBed.createComponent(AmigosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
