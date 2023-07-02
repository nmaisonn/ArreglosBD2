import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmigoItemComponent } from './amigo-item.component';

describe('AmigoItemComponent', () => {
  let component: AmigoItemComponent;
  let fixture: ComponentFixture<AmigoItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AmigoItemComponent]
    });
    fixture = TestBed.createComponent(AmigoItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
