import { Component, OnInit } from '@angular/core';

import { Charity } from 'src/app/model/charity';
import { Account, paymentMethod, donationHistoryItem} from 'src/app/model/account';

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
  numDonatedCharities: number;
  totalDonationAmount = 0;
  charityImg = [];
  donations: {[charity_name: string]: { amount: number, dates_donated: string[], charityImg: string, money: string }} = {};

  constructor(private authenticationService: AuthenticationService,
              private charityService: CharityService) { 
    this.charities = this.charityService.charities;
    console.log(this.charities);

    this.authenticationService.ready.subscribe(() => {
      if (this.authenticationService.currentUser != null) {
        this.authenticationService.getUser().subscribe((val: any) => {
          this.account = new Account(val.first_name,
                                    val.last_name,
                                    val.interests,
                                    val.donation_history,
                                    val.profile_image,
                                    val.total_amount_donated,
                                    val.email_address,
                                    val.user_ID,
                                    val.payment_methods);
          this.numDonatedCharities = ((this.account.donationHistory === undefined) ? 0 :
            Object.keys(this.account.donationHistory).length);
      
          if (this.account.donationHistory !== undefined) {
            for (const donation of this.account.donationHistory) {
              this.totalDonationAmount += donation.amount;
              if (donation.charity_name in this.donations) {
                this.donations[donation.charity_name].amount += donation.amount;
                if (this.donations[donation.charity_name].dates_donated.slice(-1)[0] !== donation.date_donated.replace(/\//g, '.')) {
                  this.donations[donation.charity_name].dates_donated.push(donation.date_donated.replace(/\//g, '.'));
                }
              }
              else {
                this.donations[donation.charity_name] = {
                  amount: donation.amount,
                  dates_donated: [donation.date_donated.replace(/\//g, '.')],
                  charityImg: this.charityService.getCharity(donation.charity_name).coverPhoto,
                  money: this.charityService.getCharity(donation.charity_name).money
                };
              }
            }
          }
          console.log(this.donations);
        });
      }
    });
  }

  ngOnInit() {
  }

}
