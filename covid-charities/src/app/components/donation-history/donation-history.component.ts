import { Component, OnInit } from '@angular/core';

import { Charity } from 'src/app/model/charity';
import { Account, paymentMethod } from 'src/app/model/account';

import { AuthenticationService } from '../../services/authentication.service';
import { CharityService } from '../../services/charity.service';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.css']
})
export class DonationHistoryComponent implements OnInit {

  account: Account;
  charities: Charity[];
  totalDonationAmount: number;
  paymentMethod: paymentMethod[] = [];

  constructor(private authenticationService: AuthenticationService,
              private charityService: CharityService) {
    this.charities = this.charityService.charities;
    console.log(this.charities);

    this.authenticationService.ready.subscribe(() => {
      if (this.authenticationService.currentUser != null) {
        this.authenticationService.getUser().subscribe((val) => {
          this.paymentMethod = [];
          this.paymentMethod.push(val.payment_methods);
          this.account = new Account(val.first_name,
                                    val.last_name,
                                    val.interests,
                                    val.donation_history,
                                    val.profile_image,
                                    val.total_amount_donated,
                                    val.email_address,
                                    val.user_ID,
                                    this.paymentMethod);
        });
      }
    });
  }

  ngOnInit() {
  }

}
