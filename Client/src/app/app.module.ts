import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BsDropdownModule, TabsModule, PaginationModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AlertifyService } from './_services/alertify.service';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeService } from './_services/employee.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { EmployeeComponent } from './Employee/employee.component';
import { EmployeeChartComponent } from './EmployeeChart/employeechart.component';


@NgModule({
   declarations: [
      AppComponent,
      EmployeeComponent,
      EmployeeChartComponent,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      PaginationModule.forRoot(),
      AgGridModule.withComponents([]),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      ChartsModule,
      NgbModule.forRoot()
   ],
   providers: [
      ErrorInterceptorProvider,
      AlertifyService,
      EmployeeService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
