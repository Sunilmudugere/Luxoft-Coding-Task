import { Component, OnInit } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'app';
jwtHelper = new JwtHelperService();
  constructor(private authService:AuthService){

  }
  ngOnInit(){
    this.authService.decodedToken = this.jwtHelper.decodeToken(localStorage.getItem("token"));
  }
}
