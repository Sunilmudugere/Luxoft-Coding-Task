import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { User } from '../_models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detailed',
  templateUrl: './member-detailed.component.html',
  styleUrls: ['./member-detailed.component.css']
})
export class MemberDetailedComponent implements OnInit {

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute) { }
  user: User;
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user']
    })
   // this.loadUser();
  }

  // loadUser() {
  //   this.userService.getUser(this.route.snapshot.params["id"]).subscribe(
  //     (user: User) => { this.user = user },
  //     error => this.alertify.error(error));
  // }

}
