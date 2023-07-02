import { TestBed } from '@angular/core/testing';

import { SolcititudCitaService } from './solcititud-cita.service';

describe('SolcititudCitaService', () => {
  let service: SolcititudCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolcititudCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
