import { TestBed } from '@angular/core/testing';

import { HabiliadadService } from './habiliadad.service';

describe('HabiliadadService', () => {
  let service: HabiliadadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HabiliadadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
