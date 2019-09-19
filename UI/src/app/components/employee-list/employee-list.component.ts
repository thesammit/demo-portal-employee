import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployee } from 'src/app/models/employee';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  employeeList: IEmployee[];
  displayedColumns: string[];
  dataSource: MatTableDataSource<IEmployee>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService, private router: Router, private route: ActivatedRoute) {
    this.displayedColumns = ['name', 'gender', 'dob', 'department', 'actions'];
  }

  ngOnInit() {
    this.populateEmployees();
  }

  populateEmployees() {
    try {
      this.employeeList = this.route.snapshot.data.employeeList as IEmployee[];
      this.updateTableData();
    } catch (error) {
      console.log(error);
    }
  }

  private updateTableData() {
    this.dataSource = new MatTableDataSource<IEmployee>(this.employeeList);
    this.dataSource.paginator = this.paginator;
  }

  async delete(employeeId: number) {
    try {
      this.employeeList = await this.employeeService.deleteEmployee(employeeId);
      this.updateTableData();
    } catch (error) {
      console.log(error);
    }
  }

  view(employeeId: number) {
    this.router.navigate(['employee/view', employeeId]);
  }

  edit(employeeId: number) {
    this.router.navigate(['employee/edit', employeeId]);
  }

}
