import { Injectable } from '@angular/core';
import { EmployeeService } from './employee.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { IEmployee } from '../models/employee';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class EmployeeListResolverService implements Resolve<IEmployee[]> {

  constructor(private employeeService: EmployeeService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee[]> {
    return this.employeeService.getEmployees().pipe(map(employeeList => employeeList));
  }
}
