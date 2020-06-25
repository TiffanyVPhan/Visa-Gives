import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';

import { AccountService } from './services/account.service';
import { CharityService } from './services/charity.service';

import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CharityDetailsComponent } from './components/charity-details/charity-details.component';
import { AccountInfoComponent } from './components/account-info/account-info.component';
import { CardComponent } from './components/card/card.component';
import { CreateAccountComponent } from './components/create-account/create-account.component';
import { AccountCardComponent } from './components/account-card/account-card.component';
import { PaymentMethodComponent } from './components/payment-method/payment-method.component';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DonationHistoryComponent } from './components/donation-history/donation-history.component';

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
  },
  {
    path: 'payment-methods',
    component: PaymentMethodComponent
  },
  {
    path: 'donation-history',
    component: DonationHistoryComponent
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
    AccountCardComponent,
    PaymentMethodComponent,
    DonationHistoryComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled'
    }),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  providers: [AccountService, CharityService],
  bootstrap: [AppComponent, AccountCardComponent]
})
export class AppModule { }
