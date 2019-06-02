import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { GridOptions } from 'ag-grid-community';
import { Employee } from '../_models/employee';
import { EmployeeService } from '../_services/employee.service';
import { AlertifyService } from '../_services/alertify.service';
import { Pagination, EmployeeViewModel } from '../_models/employeeViewModel';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

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
      suppressHorizontalScroll: true,
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
    { headerName: 'Employee Id', field: 'id', editable: true, width: 120, minWidth: 90, maxWidth: 150, suppressSizeToFit: false },
    { headerName: 'First Name', field: 'firstName', editable: true, width: 180, minWidth: 120, maxWidth: 250, suppressSizeToFit: false },
    { headerName: 'Last Name', field: 'lastName', editable: true, width: 180, minWidth: 120, maxWidth: 250, suppressSizeToFit: false },
    { headerName: 'Age', field: 'age', editable: true, width: 120, minWidth: 90, maxWidth: 150, suppressSizeToFit: false },
    { headerName: 'Gender', field: 'gender', editable: true, width: 130, minWidth: 90, maxWidth: 150, suppressSizeToFit: false },
    { headerName: 'City', field: 'city', editable: true, width: 180, minWidth: 120, maxWidth: 200, suppressSizeToFit: false },
    { headerName: 'Country', field: 'country', editable: true, width: 180, minWidth: 120, maxWidth: 200, suppressSizeToFit: false },
  ];

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    if(selectedData.length <1){
      this.alertify.error("Please select the records to be deleted.")
    return;}
    var res = this.gridApi.updateRowData({ remove: selectedData });
    console.log(res.remove[0].data.id);
    var id = res.remove[0].data.id;
  }
  onAddRow() {
    var newItem = this.createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });

    var data = { 'make': res.add[0].data.make, 'model': res.add[0].data.model, 'price': res.add[0].data.price };
    console.log(data)
  }

  createNewRowData() {
    var newData = {
      make: "Hyundai",
      model: 2017,
      price: 3500000
    };
    return newData;
  }
}

