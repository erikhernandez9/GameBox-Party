import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { register } from 'swiper/element/bundle';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ActivityManagerComponent } from './activity/activity-manager/activity-manager.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ActivityCreateComponent } from './activity/activity-create/activity-create.component';
import { ActivityHomeComponent } from './activity/activity-home/activity-home.component';
import { ActivityUpdateComponent } from './activity/activity-update/activity-update.component';
import { ProposalHomeComponent } from './proposal/proposal-home/proposal-home.component';
import { ProposalCreateComponent } from './proposal/proposal-create/proposal-create.component';
import { ProposalManagerComponent } from './proposal/proposal-manager/proposal-manager.component';
import { ProposalUpdateComponent } from './proposal/proposal-update/proposal-update.component';
import { ActivityIndexComponent } from './activity/activity-index/activity-index.component';
import { ProposalUpdateUserComponent } from './proposal/proposal-update-user/proposal-update-user.component';
import { PasswordInputComponent } from './utils/password-input/password-input.component';
import { RoomHomeComponent } from './room/room-home/room-home.component';
import { RoomCreateComponent } from './room/room-create/room-create.component';
import { RoomWaitingComponent } from './room/room-waiting/room-waiting.component';
import { RoomFinishedComponent } from './room/room-finished/room-finished.component';
import { RoomRunningPlayerComponent } from './room/room-running-player/room-running-player.component';
import { RoomRunningHostComponent } from './room/room-running-host/room-running-host.component';
import { UserHomeComponent } from './user/user-home/user-home.component';
import { UserManagerComponent } from './user/user-manager/user-manager.component';
import { UserUpdateComponent } from './user/user-update/user-update.component';


register();
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignInComponent,
    SignUpComponent,
    SidebarComponent,
    ActivityManagerComponent,
    AccountManagerComponent,
    HeaderComponent,
    FooterComponent,
    ActivityCreateComponent,
    ActivityHomeComponent,
    ActivityUpdateComponent,
    ProposalHomeComponent,
    ProposalCreateComponent,
    ProposalManagerComponent,
    ProposalUpdateComponent,
    ActivityIndexComponent,
    ProposalUpdateUserComponent,
    PasswordInputComponent,
    RoomHomeComponent,
    RoomCreateComponent,
    RoomWaitingComponent,
    RoomFinishedComponent,
    RoomRunningPlayerComponent,
    RoomRunningHostComponent,
    UserHomeComponent,
    UserManagerComponent,
    UserUpdateComponent
  ],
  imports: [
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
