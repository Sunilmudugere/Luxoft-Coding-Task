import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guard/auth.guard';
import { MemberDetailedComponent } from './member-detailed/member-detailed.component';
import { MemberDetailResolver } from './_resolver/MemberDetailResolver';
import { MemberListResolver } from './_resolver/MemberListResolver';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditProfileResolver } from './_resolver/editProfileResolver';
import { UnSavedGuard } from './_guard/unSavedGuard';
import { TestComponent } from './Test/Test.component';

export const appRoutes: Routes = [
  { path:'home', component:HomeComponent },
  { path:'test', component:TestComponent },
  { path:'members', component:MemberListComponent, canActivate:[AuthGuard] ,
  resolve:{users:MemberListResolver}},
  { path:'members/:id', component:MemberDetailedComponent, canActivate:[AuthGuard],
   resolve:{user:MemberDetailResolver} },
   { path:'edit', component:EditProfileComponent, canActivate:[AuthGuard],
   resolve:{user:EditProfileResolver}, canDeactivate:[UnSavedGuard] },
  { path:'lists', component:ListsComponent  },
  { path:'messages', component:MessagesComponent },
  { path:'**', redirectTo:'home', pathMatch:'full'}
];

