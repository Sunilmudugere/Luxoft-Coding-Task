import { Injectable } from "@angular/core";
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { EditProfileComponent } from "../edit-profile/edit-profile.component";
import { Observable } from "rxjs";

@Injectable()
export class UnSavedGuard implements CanDeactivate<EditProfileComponent> {
    canDeactivate(component: EditProfileComponent, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
        
        if(component.editForm.dirty){
           return confirm("Unsaved changes will be lost");
        }
        
        return true;
    }
}