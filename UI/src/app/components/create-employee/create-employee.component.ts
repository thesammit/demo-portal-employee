import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IEmployee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss']
})
export class CreateEmployeeComponent implements OnInit {

  newEmployeeForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  gender: FormControl;
  dateOfBirth: FormControl;
  department: FormControl;
  newEmployee: IEmployee;
  validGenders: string[];
  availableEmployees: IEmployee[];

  constructor(private employeeService: EmployeeService) {
    this.newEmployee = {} as IEmployee;
    this.validGenders = ['Male', 'Female', 'I won\'t Answer'];
  }

  ngOnInit() {
    this.populateEmployeeList();
    this.initializeFormFields();
  }

  async populateEmployeeList() {
    try {
      this.availableEmployees = await this.employeeService.getEmployeeList();
    } catch (error) {
      console.log(error);
    }
  }

  initializeFormFields() {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.gender = new FormControl('', [Validators.required]);
    this.dateOfBirth = new FormControl('', [Validators.required]);
    this.department = new FormControl('', [Validators.required]);
    this.newEmployeeForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      department: this.department
    });
  }

  saveEmployee(employee: IEmployee) {
    this.newEmployee.firstName = employee.firstName;
    this.newEmployee.lastName = employee.lastName;
    this.newEmployee.gender = employee.gender;
    this.newEmployee.dateOfBirth = employee.dateOfBirth;
    this.newEmployee.department = employee.department;

    // this.firstName.setErrors({ invalid: true });
    this.newEmployee.employeeId = this.availableEmployees.length + 1;
    this.employeeService.addEmployee(this.newEmployee);
  }

}
