import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeBaseComponent } from './components/employee-base/employee-base.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { EmployeeRouteActivatorService } from './services/employee-route-activator.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreateEmployeeComponent } from './components/create-employee/create-employee.component';
import { EmployeeListResolverService } from './services';


const routes: Routes = [
  {
    path: 'employee', component: EmployeeBaseComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'view/:id', component: EmployeeDetailsComponent, canActivate: [EmployeeRouteActivatorService] },
      { path: 'edit/:id', component: CreateEmployeeComponent, canActivate: [EmployeeRouteActivatorService] },
      { path: 'list', component: EmployeeListComponent, resolve: { employeeList: EmployeeListResolverService } },
      { path: 'new', component: CreateEmployeeComponent },
      { path: '**', redirectTo: 'list' }
    ]
  },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: 'employee', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
