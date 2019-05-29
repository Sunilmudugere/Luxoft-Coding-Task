import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username : new FormControl('Suni',Validators.required),
      password : new FormControl('',[Validators.required, Validators.minLength(4)])
    },this.isPasswordCorrect);

    
  }
  isPasswordCorrect(g:FormGroup){
    return g.get('password').value == 'Apples'? null: {'mismatch':true};
  }
  register() {
    // this.authService.register(this.model).subscribe(() => { this.alertify.success("Successfully Registered") },
    //   error => { this.alertify.error(error) });
console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    console.log("cancelled");
  }

}
