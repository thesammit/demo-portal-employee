import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EmployeeService {

  private employees: BehaviorSubject<IEmployee[]>;
  private dataStore: { employees: IEmployee[]; };

  constructor() {
    this.dataStore = { employees: [] };
  }

  private getFromDataStore(): IEmployee[] {
    if (!this.dataStore.employees.length) {
      this.dataStore.employees.push({
        employeeId: 1,
        firstName: 'Soham',
        lastName: 'Mitra',
        dob: new Date(),
        gender: 'male',
        department: 'Retail'
      }, {
        employeeId: 2,
        firstName: 'Jayita',
        lastName: 'Roy',
        dob: new Date(),
        gender: 'female',
        department: 'Investment'
      });
    }
    return this.dataStore.employees;
  }

  getEmployeeList(): IEmployee[] {
    return this.getFromDataStore();
  }

  getEmployee(employeeId: number): IEmployee {
    return {} as IEmployee;
  }

  addEmployee(employee: IEmployee): IEmployee[] {
    return this.getFromDataStore();
  }

  updateEmployee(employee: IEmployee): IEmployee[] {
    return this.getFromDataStore();
  }

  deleteEmployee(employeeId: number): IEmployee[] {
    return this.getFromDataStore();
  }
}
