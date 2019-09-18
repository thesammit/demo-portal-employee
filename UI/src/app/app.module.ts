import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import {
  EmployeeBaseComponent, EmployeeListComponent, EmployeeDetailsComponent, NotFoundComponent,
  SidenavComponent, ToolbarComponent, CreateEmployeeComponent
} from './components';
import {
  EmployeeListResolverService, BackendService, EmployeeService, EmployeeRouteActivatorService
} from './services';

@NgModule({
  declarations: [
    AppComponent, EmployeeBaseComponent, EmployeeListComponent, CreateEmployeeComponent,
    EmployeeDetailsComponent, NotFoundComponent, SidenavComponent, ToolbarComponent,
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, AppRoutingModule,
    MaterialModule, FormsModule, ReactiveFormsModule, HttpClientModule
  ],
  providers: [EmployeeRouteActivatorService, EmployeeService, BackendService, EmployeeListResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }
