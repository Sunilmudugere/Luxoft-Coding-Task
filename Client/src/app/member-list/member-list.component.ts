import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users:User[];
  constructor(private userService:UserService,private alertify:AlertifyService,
  private route:ActivatedRoute ) { }

  ngOnInit() {
    this.route.data.subscribe(data =>{
      this.users = data['users']
    })
    //this.getAllUsers();
  }

  // getAllUsers(){
  //   this.userService.getAllUsers().subscribe((users:User[])=>{
  //     this.users = users;
  //   }, error => this.alertify.error(error))
  // }
}
