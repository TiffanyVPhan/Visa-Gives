import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-account-card',
  templateUrl: './account-card.component.html',
  styleUrls: ['./account-card.component.css']
})
export class AccountCardComponent implements OnInit {
  public accountfeatures: string[] = [
    'Donation History',
    'Bookmarked',
    'Payment Methods',
    'Settings',
    'Notifications',
    'Terms of Service',
    'Privacy Policy',
    'Human Services',
  ];
  public accountroutes: string[] = [
    'donation-history',
    '#',
    'payment-methods',
    '#',
    '#',
    '#',
    '#',
    '#',
  ];

  account: Account;
  constructor(private accountService: AccountService,
              private  route: ActivatedRoute,
              public authenticationService: AuthenticationService) {
      this.accountService.ready.subscribe(() => {
        this.account = this.accountService.currentUser;
        console.log(this.account);
        });
      }

  ngOnInit() {}

}
