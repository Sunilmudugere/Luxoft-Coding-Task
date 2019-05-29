import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../_services/communicator.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  constructor(private communicatorService : CommunicatorService) { 
    communicatorService.missionConfirmed$.subscribe(x=>{
      this.newGuyinTow = x;
    })
  }
newGuyinTow = "Odd Guy Rules";
  ngOnInit() {
  }
  ICLicked(){
    this.communicatorService.announceMission("New guy entered old area");
  }
}
