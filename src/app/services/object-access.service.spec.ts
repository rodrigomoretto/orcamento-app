import { TestBed } from '@angular/core/testing';

import { ObjectAccessService } from './object-access.service';

describe('ObjectAccessService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObjectAccessService = TestBed.get(ObjectAccessService);
    expect(service).toBeTruthy();
  });
});
