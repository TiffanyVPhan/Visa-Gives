import { Component, OnInit } from '@angular/core';
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

  constructor(private accountService: AccountService,
              private charityService: CharityService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   const charityName = params.get('charity_name');

    //   this.charityService.getCharityByName(charityName)
    //     .subscribe((charity) => this.charity = charity);
    // });

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.accountService.getAccount()
        .subscribe((account) => this.account = account);
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
