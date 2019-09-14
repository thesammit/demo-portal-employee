import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee';

@Injectable()
export class EmployeeService {

  constructor() { }
  getEmployee(employeeId: number): IEmployee {
    return {} as IEmployee;
  }
}
