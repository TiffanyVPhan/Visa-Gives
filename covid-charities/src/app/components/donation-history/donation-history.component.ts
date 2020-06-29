import { Component, OnInit } from '@angular/core';

import { CharityService } from '../../services/charity.service';
import { Charity } from 'src/app/model/charity';
import { Account } from 'src/app/model/account';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.css']
})
export class DonationHistoryComponent implements OnInit {

  account: Account;
  charities: Charity[];
  totalDonationAmount: number;

  constructor(private authenticationService: AuthenticationService,
              private charityService: CharityService) {
    this.charities = this.charityService.charities;

    this.authenticationService.ready.subscribe(() => {
      if (this.authenticationService.currentUser != null) {
        console.log('here');
        this.authenticationService.getUser().subscribe((val) => {
          this.account = new Account(val.first_name,
                                    val.last_name,
                                    val.interests,
                                    val.donation_history,
                                    val.profile_image,
                                    val.total_amount_donated,
                                    val.email_address,
                                    val.user_ID);
          console.log(this.account);
        });
      }
    });

      // this.totalDonationAmount = Object.values(this.account.donationAmount).map(Number).reduce((x, y) => x + y);
  }

  ngOnInit() {}

}
