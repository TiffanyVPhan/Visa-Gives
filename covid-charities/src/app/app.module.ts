import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AccountService } from './services/account.service';
import { CharityService } from './services/charity.service';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CharityDetailsComponent } from './components/charity-details/charity-details.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { CardComponent } from './components/card/card.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';

const routes: Routes = [
  { path: '',
    component: LandingPageComponent
  },
  {
    path: 'charity/:charity_name',
    component: CharityDetailsComponent },
  {
    path: 'account',
    component: AccountInfoComponent
  },
  {
    path: 'create-account',
    component: CreateAccountComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CharityDetailsComponent,
    AccountInfoComponent,
    CardComponent,
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    ReactiveFormsModule
  ],
  providers: [AccountService, CharityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
