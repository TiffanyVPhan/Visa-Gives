import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CharityService } from '../../services/charity.service';
import { Charity } from 'src/app/model/charity';
import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css']
})
export class CharityDetailsComponent implements OnInit {

  account: Account;
  charity: Charity;
  selectedAmount: number;
  charityName: string;

  donationTiers: number[] = [5, 10, 25, 50, 100, 250, 500, 1000];

  constructor(private accountService: AccountService,
              private charityService: CharityService,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
    this.charityService.ready.subscribe(() => {
      this.charity = this.charityService.getCharity(this.charityName);
    });

    this.accountService.ready.subscribe(() => {
      this.account = this.accountService.currentUser;
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.charityName = params.get('charity_name');
      this.charity = this.charityService.getCharity(this.charityName);
    });
  }

  onClick(amount) {
    if (amount === this.selectedAmount) {
      this.selectedAmount = undefined;
    } else {
      this.selectedAmount = amount;
    }
  }
}
