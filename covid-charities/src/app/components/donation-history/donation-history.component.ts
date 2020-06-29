import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CharityService } from '../../services/charity.service';
import { Charity } from 'src/app/model/charity';
import { Account } from 'src/app/model/account';

@Component({
  selector: 'app-donation-history',
  templateUrl: './donation-history.component.html',
  styleUrls: ['./donation-history.component.css']
})
export class DonationHistoryComponent implements OnInit {

  account: Account;
  charities: Charity[];
  totalDonationAmount: number;

  constructor(private accountService: AccountService,
              private charityService: CharityService) {
    this.charities = this.charityService.charities;

    this.accountService.ready.subscribe(() => {
      this.account = this.accountService.currentUser;

      // this.totalDonationAmount = Object.values(this.account.donationAmount).map(Number).reduce((x, y) => x + y);
    });
  }

  ngOnInit() {
  }

}
