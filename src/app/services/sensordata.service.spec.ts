import { TestBed } from '@angular/core/testing';

import { SensordataService } from './sensordata.service';

describe('SensordataService', () => {
  let service: SensordataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SensordataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
