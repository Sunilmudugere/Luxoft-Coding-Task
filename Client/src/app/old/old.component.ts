import { Component, OnInit } from '@angular/core';
import { CommunicatorService } from '../_services/communicator.service';

@Component({
  selector: 'app-old',
  templateUrl: './old.component.html',
  styleUrls: ['./old.component.css']
})
export class OldComponent implements OnInit {

  constructor(private communicatorService:CommunicatorService) {
    this.communicatorService.missionAnnounced$.subscribe(x => {
      this.oldGuyinTow = x;
    })
   }
  oldGuyinTow = "Odd Guy rules too";
  ngOnInit() {
  }
  ICLickedToo(){
    this.communicatorService.confirmMission("Old guy aquired new area");
  }
}
