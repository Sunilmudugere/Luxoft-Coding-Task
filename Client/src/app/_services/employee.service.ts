import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeViewModel } from '../_models/employeeViewModel';
import { map } from 'rxjs/operators';

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
          console.log(response);
          return response;
        }
      })
    )
  }
}
