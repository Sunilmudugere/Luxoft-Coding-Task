import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  Sunil:testModel;
  
  constructor() {
    this.Sunil = new testModel();
    this.Sunil.firstName = "Sunil"
    this.Sunil.secondName = "MP"
   }
   major = 1;
   minor = 23;
   childValue = "You are a kid";
   newMinor() {
     this.minor++;
   }
  
   newMajor() {
     this.major++;
     this.minor = 0;
   }
  ngOnInit() {

  }
  
  registerModeToggle() {
    this.registerMode = true;
  }

  cancelRegister(registerMode: boolean) {
    this.registerMode = registerMode;
  }
  onChildUpdate(valueOfChild:any){
    this.childValue = valueOfChild;
  }
}

export class testModel{
  firstName: string;
  secondName: string;
}
