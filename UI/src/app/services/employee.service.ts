import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee';

@Injectable()
export class EmployeeService {

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
        dateOfBirth: new Date(),
        gender: 'male',
        department: 'Retail'
      }, {
        employeeId: 2,
        firstName: 'Jayita',
        lastName: 'Roy',
        dateOfBirth: new Date(),
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
    let employee: IEmployee = null;
    if (this.dataStore.employees) {
      employee = this.dataStore.employees.find(emp => emp.employeeId === employeeId);
    }
    return employee;
  }

  addEmployee(employee: IEmployee): void {
    if (!this.dataStore.employees.find(emp => emp.employeeId === employee.employeeId)) {
      this.dataStore.employees.push(employee);
    }
  }

  updateEmployee(employee: IEmployee): void {
    const existingEmployee = this.dataStore.employees.find(emp => emp.employeeId === employee.employeeId);
    if (existingEmployee) {
      existingEmployee.firstName = employee.firstName;
      existingEmployee.lastName = employee.lastName;
      existingEmployee.gender = employee.gender;
      existingEmployee.dateOfBirth = employee.dateOfBirth;
      existingEmployee.department = employee.department;
    }
  }

  deleteEmployee(employeeId: number): IEmployee[] {
    if (this.dataStore.employees) {
      this.dataStore.employees = this.dataStore.employees.filter(emp => emp.employeeId !== employeeId);
    }
    return this.getFromDataStore();
  }
}
