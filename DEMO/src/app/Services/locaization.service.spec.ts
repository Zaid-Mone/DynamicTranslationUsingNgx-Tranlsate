import { TestBed } from '@angular/core/testing';

import { LocaizationService } from './locaization.service';

describe('LocaizationService', () => {
  let service: LocaizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocaizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
