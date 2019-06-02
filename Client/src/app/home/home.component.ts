import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';
import { AlertifyService } from '../_services/alertify.service';
import { Pagination, EmployeeViewModel } from '../_models/employeeViewModel';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private rowSelection;
  private gridApi;
  private gridColumnApi;
  model: EmployeeViewModel;
  gridOptions: GridOptions
  rowData: Employee[];
  @ViewChild('addForm') addForm : NgForm;
  newEmployee:Employee= new Employee();

  constructor(private http: HttpClient,
    private empService: EmployeeService,
    private alertify: AlertifyService) {

    this.model = new EmployeeViewModel();
    this.model.pagination.currentPage = 1;
    this.model.pagination.itemsPerPage = 10;
  }

  ngOnInit() {
    this.loadGrid();
    this.gridOptions = {
      pagination: false
    }
    this.rowSelection = "multiple";
  }

  pageChanged(event: any): void {
    this.model.pagination.currentPage = event.page;
    this.loadGrid();
  }

  loadGrid() {
    this.empService.getAllEmployees(this.model).subscribe(
      res => { this.rowData = res.employees; this.model.pagination = res.pagination },
      error => { this.alertify.error(error); },
    );
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  columnDefs = [
    { headerName: 'Employee Id', field: 'id', editable:false, width: 100, suppressSizeToFit: true, sortable: true },
    { headerName: 'First Name', field: 'firstName', editable: true, width: 165, suppressSizeToFit: true, sortable: true },
    { headerName: 'Last Name', field: 'lastName', editable: true, width: 165, suppressSizeToFit: true, sortable: true },
    { headerName: 'Age', field: 'age', editable: true, width: 80, suppressSizeToFit: true, sortable: true },
    { headerName: 'Gender', field: 'gender', editable: true, width: 80, suppressSizeToFit: true, sortable: true },
    { headerName: 'City', field: 'city', editable: true, width: 160, suppressSizeToFit: true, sortable: true },
    { headerName: 'Country', field: 'country', editable: true, width: 160, suppressSizeToFit: true, sortable: true },
  ];

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    
    if (selectedData.length < 1) {
      this.alertify.error("Please select the records to be deleted.")
      return;
    }
    this.model.employees = selectedData;
    this.empService.deleteAllEmployees(this.model).subscribe(
      res => { this.rowData = res.employees; this.model.pagination = res.pagination;
      this.alertify.success("Employee deleted successfully") },
      error => { this.alertify.error(error); },
    );
  }
  onAddRow() {
    this.newEmployee.id = 0;
    this.model.employees = new Array<Employee>();
    this.model.employees.push(this.newEmployee);
    this.empService.saveAllEmployees(this.model).subscribe(
      res => { this.rowData = res.employees; this.model.pagination = res.pagination;
      this.alertify.success("Employee Added successfully") },
      error => { this.alertify.error(error); },
    );
    this.addForm.resetForm();
  }

  onUpdate(){
    this.model.employees = new Array<Employee>();
    this.model.employees = this.rowData;
    this.empService.saveAllEmployees(this.model).subscribe(
      res => { this.rowData = res.employees; this.model.pagination = res.pagination;
      this.alertify.success("Employee Saved successfully") },
      error => { this.alertify.error(error); },
    );
  }
}

