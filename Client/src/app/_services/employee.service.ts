import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeViewModel } from '../_models/employeeViewModel';
import { map } from 'rxjs/operators';
import { EmployeeStatistics } from '../_models/employeeStatistics';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl + "Employee";

  getAllEmployees(model: any):Observable<EmployeeViewModel> {
    return this.http.post(this.baseUrl + '/GetEmployees', model).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  };

  saveAllEmployees(model: any):Observable<EmployeeViewModel> {
    return this.http.post(this.baseUrl + '/SaveEmployees', model).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  };

  deleteAllEmployees(model: any):Observable<EmployeeViewModel> {
    return this.http.post(this.baseUrl + '/DeleteEmployees', model).pipe(
      map((response: any) => {
        if (response) {
          return response;
        }
      })
    )
  };

  getEmployeeStatisics():Observable<EmployeeStatistics> {
    return this.http.get<EmployeeStatistics>(this.baseUrl + '/EmployeeStatistics').pipe(
      map(res => {
        res.yearList.toString()
        return res;
      })
    );
  };
}
