import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeBaseComponent } from './components/employee-base/employee-base.component';


const routes: Routes = [
  {
    path: 'employee', component: EmployeeBaseComponent,
    children: [
      { path: 'list' },
      { path: '**', redirectTo: 'list' }
    ]
  },
  { path: '**', redirectTo: '/employee', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
