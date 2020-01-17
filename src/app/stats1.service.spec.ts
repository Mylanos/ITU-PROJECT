import { TestBed } from '@angular/core/testing';

import { Stats1Service } from './stats1.service';

describe('Stats1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Stats1Service = TestBed.get(Stats1Service);
    expect(service).toBeTruthy();
  });
});
