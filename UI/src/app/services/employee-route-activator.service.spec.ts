import { TestBed } from '@angular/core/testing';

import { EmployeeRouteActivatorService } from './employee-route-activator.service';

describe('EmployeeRouteActivatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeRouteActivatorService = TestBed.get(EmployeeRouteActivatorService);
    expect(service).toBeTruthy();
  });
});
