import { TestBed } from '@angular/core/testing';

import { SensortypeService } from './sensortype.service';

describe('SensortypeService', () => {
  let service: SensortypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensortypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
