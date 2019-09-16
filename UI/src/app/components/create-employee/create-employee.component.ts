import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { IEmployee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { MY_FORMATS } from 'src/app/app.properties';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.scss'],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }]
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  firstName: FormControl;
  lastName: FormControl;
  gender: FormControl;
  dateOfBirth: FormControl;
  department: FormControl;
  employeeDetails: IEmployee;
  validGenders: string[];

  constructor(private employeeService: EmployeeService) {
    this.employeeDetails = {} as IEmployee;
    this.validGenders = ['Male', 'Female', 'I would not Disclose'];
  }

  ngOnInit() {
    this.initializeFormFields();
  }

  initializeFormFields() {
    this.firstName = new FormControl('', [Validators.required]);
    this.lastName = new FormControl('', [Validators.required]);
    this.gender = new FormControl('', [Validators.required]);
    this.dateOfBirth = new FormControl('', [Validators.required]);
    this.department = new FormControl('', [Validators.required]);
    this.employeeForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      gender: this.gender,
      dateOfBirth: this.dateOfBirth,
      department: this.department
    });
  }

  saveEmployee(employee: IEmployee, formDirective: FormGroupDirective) {
    if (!this.employeeForm.invalid && this.isValidEmpolyee(employee)) {
      this.employeeDetails.firstName = employee.firstName;
      this.employeeDetails.lastName = employee.lastName;
      this.employeeDetails.gender = employee.gender;
      this.employeeDetails.dateOfBirth = employee.dateOfBirth;
      this.employeeDetails.department = employee.department;

      // this.firstName.setErrors({ invalid: true });
      this.employeeService.addEmployee(this.employeeDetails);
      formDirective.resetForm();
      this.employeeForm.reset();
    }
  }

  isValidEmpolyee(employee: IEmployee): boolean {
    let isValid = true;
    const regex = /[^a-zA-Z]+/g;
    if (employee.firstName.match(regex)) {
      this.firstName.setErrors({ invalid: true });
      isValid = false;
    }
    if (employee.lastName.match(regex)) {
      this.lastName.setErrors({ invalid: true });
      isValid = false;
    }

    return isValid;
  }

}
