import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';

import { CharityService } from '../../services/charity.service';
import { Charity } from 'src/app/model/charity';
import { Account, paymentMethod } from '../../model/account';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css']
})
export class CharityDetailsComponent implements OnInit {

  account: Account;
  charity: Charity;
  selectedAmount: number = null;
  charityName: string;
  donationTiers: number[] = [5, 10, 25, 50, 100, 250, 500, 1000];
  cardNumber: number;
  donated = false;

  constructor(public authenticationService: AuthenticationService,
              private charityService: CharityService,
              private route: ActivatedRoute) {
    this.charityService.ready.subscribe(() => {
      this.charity = this.charityService.getCharity(this.charityName);
      console.log(this.charity);
    });

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
          if (this.account.payment != undefined) {
            this.cardNumber = parseInt(this.account.payment[0].card_number.replace(/ /g,''));
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.charityName = params.get('charity_name');
      this.charity = this.charityService.getCharity(this.charityName);
      console.log(this.charity);
    });
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
      if (this.account.payment != undefined) {
        this.cardNumber = parseInt(this.account.payment[0].card_number.replace(/ /g,''));
      }
    });
  }

  onClick(amount) {
    if (amount === this.selectedAmount) {
      this.addDonation();
    } else {
      this.selectedAmount = amount;
    }
    console.log(amount);
  }

  addDonation() {
    const numDonations =
      ((this.account.donationHistory === undefined) ? 0 :
        this.account.donationHistory.length);
    console.log(numDonations);

    this.authenticationService.addDonation(
      this.charityName,
      this.selectedAmount,
      formatDate(new Date(), 'MM/dd/yyyy', 'en'),
      numDonations);

    this.donated = !this.donated;
  }

  cancelDonation() {
    this.selectedAmount = null;
  }
}
