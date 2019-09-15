import { Injectable } from '@angular/core';
import { IEmployee } from '../models/employee';
import { BackendService } from './backend.service';
import { SERVER_LOCATION } from '../app.properties';

@Injectable()
export class EmployeeService {

  private dataStore: { employees: IEmployee[]; };

  constructor(private backendService: BackendService) {
    this.dataStore = { employees: [] };
  }

  private async getFromDataStore(): Promise<IEmployee[]> {
    const url = SERVER_LOCATION + 'employees';
    if (!this.dataStore.employees.length) {
      try {
        this.dataStore.employees = await this.backendService.getMethod(url).toPromise();
        return this.dataStore.employees;
      } catch (error) {
        console.log(error);
      }
    }
    return this.dataStore.employees;
  }

  async getEmployeeList(): Promise<IEmployee[]> {
    return await this.getFromDataStore();
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
        } else {
          throw new Error('Employee Id is present! try Editing');
        }
      },
      error => {
        console.log(error);
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
      error => {
        console.log(error);
      }
    );
  }

  async deleteEmployee(employeeId: number): Promise<IEmployee[]> {
    const url = SERVER_LOCATION + 'employee';
    try {
      const empId = await this.backendService.deleteMethod(url).toPromise();
      if (this.dataStore.employees) {
        this.dataStore.employees = this.dataStore.employees.filter(emp => emp.employeeId !== empId);
      }
      return this.dataStore.employees;
    } catch (error) {
      console.log(error);
    }
  }
}
