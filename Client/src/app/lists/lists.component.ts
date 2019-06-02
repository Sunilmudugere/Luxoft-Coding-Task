import { Component, OnInit, ViewChild } from '@angular/core';  
import { EmployeeService } from '../_services/employee.service';
import { Employee } from '../_models/employee';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {  
  
  public activeModal: NgbActiveModal;
constructor(private empService: EmployeeService){  }
  ngOnInit() {  }
  closeModal() {
    this.activeModal.close('Modal Closed');
  }  
    
}  