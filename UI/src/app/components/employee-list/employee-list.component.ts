import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployee } from 'src/app/models/employee';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: IEmployee[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<IEmployee>;

  constructor(private employeeService: EmployeeService) {
    this.displayedColumns = ['name', 'gender', 'dob', 'department', 'actions'];
  }

  ngOnInit() {
    this.populateEmployees();
  }

  async populateEmployees() {
    this.employeeList = await this.employeeService.getEmployeeList();
    this.dataSource = new MatTableDataSource<IEmployee>(this.employeeList);
  }



}
