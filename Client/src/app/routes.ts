import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './Employee/employee.component';
import { EmployeeChartComponent } from 'src/app/EmployeeChart/employeechart.component';

export const appRoutes: Routes = [
  { path:'home', component:EmployeeComponent },
  { path:'chart', component:EmployeeChartComponent },
  { path:'**', redirectTo:'home', pathMatch:'full'}
];

