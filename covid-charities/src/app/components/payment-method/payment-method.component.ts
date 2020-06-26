import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';

import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  account: Account;
  constructor(private accountService: AccountService,
              private route: ActivatedRoute) {
        this.accountService.ready.subscribe(() => {
          this.account = this.accountService.currentUser;
      });
    }

  ngOnInit() {}

}
