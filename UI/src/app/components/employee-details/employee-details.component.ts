import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { IEmployee } from 'src/app/models/employee';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  selectedEmployee: IEmployee;
  employeeId: number;
  constructor(private employeeService: EmployeeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = +params.id;
      this.selectedEmployee = this.employeeService.getEmployee(this.employeeId);
    });
  }

  edit() {
    this.router.navigate(['employee/edit', this.employeeId]);
  }

  back() {
    this.router.navigate(['employee/list']);
  }
}
