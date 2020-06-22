import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { AccountService } from '../../services/account.service';
import { Account } from '../../model/account';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  account: Account;
  constructor(private accountService: AccountService,
              private  route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.accountService.getAccount()
        .subscribe((account) => this.account = account);
    });
  }
}
