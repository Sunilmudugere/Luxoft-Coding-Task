import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { User } from "../_models/user";
import { Observable, of } from "rxjs";
import { UserService } from "../_services/User.service";
import { AlertifyService } from "../_services/alertify.service";
import { catchError } from "rxjs/operators";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class EditProfileResolver implements Resolve<User> {
    constructor(private userService : UserService, private alertyify: AlertifyService,
    private router:Router, private authService:AuthService){

    }
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid).pipe(
            catchError(error => {
                this.alertyify.error("Data retrieveing Issue");
                this.router.navigate(['/home']);
                return of(null);
            })
        );
    }
}