import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudAmistadComponent } from './solicitud-amistad.component';

describe('SolicitudAmistadComponent', () => {
  let component: SolicitudAmistadComponent;
  let fixture: ComponentFixture<SolicitudAmistadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SolicitudAmistadComponent]
    });
    fixture = TestBed.createComponent(SolicitudAmistadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
