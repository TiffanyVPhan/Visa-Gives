import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {

  account: Account;
  numDonatedCharities: number;
  constructor(private accountService: AccountService,
              private authenticationService: AuthenticationService,
              private  route: ActivatedRoute) {
        this.accountService.ready.subscribe(() => {
          this.account = this.accountService.currentUser;
          this.numDonatedCharities = Object.keys(this.account.donatedCharities).length;
      });
    }

  ngOnInit() {
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   this.accountService.getAccount()
    //     .subscribe((account) => this.account = account);
    // });

  }
}
