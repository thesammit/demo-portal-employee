import { TestBed } from '@angular/core/testing';

import { EmployeeListResolverService } from './employee-list-resolver.service';

describe('EmployeeListResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeListResolverService = TestBed.get(EmployeeListResolverService);
    expect(service).toBeTruthy();
  });
});
