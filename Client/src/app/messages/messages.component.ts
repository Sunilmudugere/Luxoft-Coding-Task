import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../_services/employee.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(private empService: EmployeeService) { }


  ngOnInit() {
    this.empService.getEmployeeStatisics().subscribe(
      res => {
        this.ChartData = [res.deletedEmployeeCount, res.currentEmployeeCount];
      },

      error => { console.log(error); },
    );

  }

  ChartLabels = ['Deleted Employess', 'Current Employees'];
  ChartData: number[];
  pie = 'pie';
  doughnut = 'doughnut';
  public barChartType = 'bar';

  // event on pie chart slice hover
  public chartHovered(e: any): void {
    console.log(e);
  }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels:number[];
  
  public barChartLegend = true;

  public barChartData = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];
}