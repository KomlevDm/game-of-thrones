import { TestBed } from '@angular/core/testing';

import { SoundsService } from './sounds.service';

describe('SoundsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SoundsService = TestBed.get(SoundsService);
    expect(service).toBeTruthy();
  });
});
