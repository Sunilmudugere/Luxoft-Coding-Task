import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  @ViewChild('editForm') editForm:NgForm;
user:User;
@HostListener('window.beforeunload',['$event'])
unloadNotification($event:any){
  if(this.editForm.dirty){
    $event.returnValue = true;
  }
}
  constructor(private route:ActivatedRoute, private alertify : AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data["user"];
    });
  }

  UpdateInfo(){
    console.log(this.user);
    this.alertify.success("Updated Info");
    this.editForm.reset(this.user);
   // this.user.introduction = "Sum Sumne";
  }

}
