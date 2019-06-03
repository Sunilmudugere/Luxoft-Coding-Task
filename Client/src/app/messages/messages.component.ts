import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';
import { BarChartData } from '../_models/barChartData';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private empService: EmployeeService) { }

  existingEmployee: number = 0;
  quitEmployee: number = 0;
  ngOnInit() {
    this.empService.getEmployeeStatisics().subscribe(
      res => {
        this.ChartData = [res.deletedEmployeeCount, res.currentEmployeeCount];
        this.barChartLabels = res.yearList.map(String);
        this.barChartData[0].data = res.employeeAdded;
        this.barChartData[1].data = res.employeeDeleted;
      },

      error => { console.log(error); },
    );

  }

  ChartLabels = ['Deleted Employess', 'Current Employees'];
  ChartData = [0, 0];
  pie = 'pie';
  doughnut = 'doughnut';

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels : string[];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [
    {data: [], label: 'Employees Added'},
    {data: [], label: 'Employees Deleted'}
  ];
}