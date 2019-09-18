import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  EmployeeBaseComponent, EmployeeListComponent, EmployeeDetailsComponent, NotFoundComponent, CreateEmployeeComponent
} from './components';
import { EmployeeListResolverService, EmployeeRouteActivatorService } from './services';

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
