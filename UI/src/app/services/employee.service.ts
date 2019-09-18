import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee';
import { BackendService } from './backend.service';
import { SERVER_LOCATION } from '../app.properties';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EmployeeService {

  private dataStore: { employees: IEmployee[]; };

  constructor(private backendService: BackendService) {
    this.dataStore = { employees: [] };
  }

  getEmployees(): Observable<IEmployee[]> {
    const url = SERVER_LOCATION + 'employees';
    const empListObservable: Observable<IEmployee[]> = this.backendService.getMethod(url);
    this.storeEmployees(empListObservable);
    return empListObservable;
  }

  async storeEmployees(empListObservable: Observable<IEmployee[]>) {
    this.dataStore.employees = await empListObservable.toPromise();
  }

  getEmployee(employeeId: number): IEmployee {
    if (this.dataStore.employees) {
      return this.dataStore.employees.find(emp => emp.employeeId === employeeId);
    }
    return null;
  }

  async addEmployee(employee: IEmployee) {
    const url = SERVER_LOCATION + 'employee';
    this.backendService.postMethod(url, employee).subscribe(
      response => {
        if (!this.dataStore.employees.find(emp => emp.employeeId === response.employeeId)) {
          this.dataStore.employees.push(response);
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message, error.status, error.statusText);
      }
    );
  }

  updateEmployee(employee: IEmployee): void {
    const url = SERVER_LOCATION + 'employee';
    this.backendService.putMethod(url, employee).subscribe(
      response => {
        const existingEmployee = this.dataStore.employees.find(emp => emp.employeeId === response.employeeId);
        if (existingEmployee) {
          existingEmployee.firstName = response.firstName;
          existingEmployee.lastName = response.lastName;
          existingEmployee.gender = response.gender;
          existingEmployee.dateOfBirth = response.dateOfBirth;
          existingEmployee.department = response.department;
        }
      },
      (error: HttpErrorResponse) => {
        console.error(error.message, error.status, error.statusText);
      }
    );
  }

  async deleteEmployee(employeeId: number): Promise<IEmployee[]> {
    const url = SERVER_LOCATION + 'employee/' + employeeId;
    try {
      const employee: IEmployee = await this.backendService.deleteMethod(url).toPromise();
      if (this.dataStore.employees) {
        this.dataStore.employees = this.dataStore.employees.filter(emp => emp.employeeId !== employee.employeeId);
      }
      return this.dataStore.employees;
    } catch (error) {
      console.error(error);
    }
  }
}
