import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { BsDropdownModule, TabsModule, PaginationModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { MemberListComponent } from './member-list/member-list.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guard/auth.guard';
import { AlertifyService } from './_services/alertify.service';
import { UserService } from './_services/User.service';
import { MemberCardComponent } from './member-card/member-card.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MemberDetailedComponent } from './member-detailed/member-detailed.component';
import { MemberDetailResolver } from './_resolver/MemberDetailResolver';
import { MemberListResolver } from './_resolver/MemberListResolver';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileResolver } from './_resolver/editProfileResolver';
import { UnSavedGuard } from './_guard/unSavedGuard';
import { CountDownnComponent } from './countDownn/countDownn.component';
import { TestComponent } from './Test/Test.component';
import { NewComponent } from './new/new.component';
import { OldComponent } from './old/old.component';
import { AgGridModule } from 'ag-grid-angular';
import { EmployeeService } from './_services/employee.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';

export function tokenGetter(){
    return localStorage.getItem('token');
}
@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ListsComponent,
      MessagesComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailedComponent,
      EditProfileComponent,
      TestComponent,
      CountDownnComponent,
      NewComponent,
      OldComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      PaginationModule.forRoot(),
      AgGridModule.withComponents([]),
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      TabsModule.forRoot(),
      ChartsModule,
      NgbModule.forRoot(),
      JwtModule.forRoot({
        config:{
            tokenGetter:tokenGetter,
            whitelistedDomains:['localhost:5000'],
            blacklistedRoutes:['localhost:5000/api/auth']
        }
    })
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      EditProfileResolver,
      UnSavedGuard,
      EmployeeService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
