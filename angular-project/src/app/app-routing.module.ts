import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

//Activity Components
import { ActivityHomeComponent } from './activity/activity-home/activity-home.component';
import { ActivityManagerComponent } from './activity/activity-manager/activity-manager.component';
import { ActivityCreateComponent } from './activity/activity-create/activity-create.component';
import { ActivityUpdateComponent } from './activity/activity-update/activity-update.component';

//Proposal Components
import { ProposalHomeComponent } from './proposal/proposal-home/proposal-home.component';
import { ProposalManagerComponent } from './proposal/proposal-manager/proposal-manager.component';
import { ProposalCreateComponent } from './proposal/proposal-create/proposal-create.component';
import { ProposalUpdateComponent } from './proposal/proposal-update/proposal-update.component';
import { ProposalUpdateUserComponent } from './proposal/proposal-update-user/proposal-update-user.component';

//Room Components
import { RoomHomeComponent } from './room/room-home/room-home.component';
import { RoomCreateComponent } from './room/room-create/room-create.component';
import { RoomWaitingComponent } from './room/room-waiting/room-waiting.component';
import { RoomFinishedComponent } from './room/room-finished/room-finished.component';
import { RoomRunningPlayerComponent } from './room/room-running-player/room-running-player.component';
import { RoomRunningHostComponent } from './room/room-running-host/room-running-host.component';

//User Components
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserManagerComponent } from './user/user-manager/user-manager.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';


import { AccountManagerComponent } from './account-manager/account-manager.component';
import { adminGuard, userGuard, isSignedGuard } from './guards/permissions.guard';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'sign-in', canMatch: [isSignedGuard], component: SignInComponent },
  { path: 'sign-up', canMatch: [isSignedGuard], component: SignUpComponent },
  { path: 'account-manager', canMatch: [userGuard], component: AccountManagerComponent },
  {
    path: 'room', component: RoomHomeComponent,
    children: [
      { path: '', redirectTo: 'create', pathMatch: 'full' },
      { path: 'create', canMatch: [userGuard], component: RoomCreateComponent },
      { path: 'waiting/:id', component: RoomWaitingComponent },
      { path: 'finished/:id', component: RoomFinishedComponent },
      { path: 'running-player/:id', component: RoomRunningPlayerComponent },
      { path: 'running-host/:id', canMatch: [userGuard], component: RoomRunningHostComponent },
      { path: '**', redirectTo: 'create' },
    ]
  },
  {
    path: 'proposal-manager', canMatch: [userGuard], component: ProposalHomeComponent,
    children: [
      { path: '', redirectTo: 'manage', pathMatch: 'full' },
      { path: 'manage', component: ProposalManagerComponent },
      { path: 'create', component: ProposalCreateComponent },
      { path: 'admin/update/:id', canMatch: [adminGuard], component: ProposalUpdateComponent },
      { path: 'update/:id', component: ProposalUpdateUserComponent },
      { path: '**', redirectTo: 'manage' },
    ]
  },
  {
    path: 'activity-manager', canMatch: [adminGuard], component: ActivityHomeComponent,
    children: [
      { path: '', redirectTo: 'manage', pathMatch: 'full' },
      { path: 'manage', component: ActivityManagerComponent },
      { path: 'create', component: ActivityCreateComponent },
      { path: 'update/:id', component: ActivityUpdateComponent },
      { path: '**', redirectTo: 'manage' },
    ]
  },
  {
    path: 'user-manager', canMatch: [adminGuard], component: UserHomeComponent,
    children: [
      { path: '', redirectTo: 'manage', pathMatch: 'full' },
      { path: 'manage', component: UserManagerComponent },
      { path: 'update/:id', component: UserUpdateComponent },
      { path: '**', redirectTo: 'manage' },
    ]
  },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
