import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { EmployeeService } from './employee.service';

@Injectable()
export class EmployeeRouteActivatorService implements CanActivate {

  constructor(private employeeService: EmployeeService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isEmployeePresent = !!this.employeeService.getEmployee(+route.params.id);
    if (!isEmployeePresent) {
      this.router.navigate(['/404']);
    }
    return isEmployeePresent;
  }
}
