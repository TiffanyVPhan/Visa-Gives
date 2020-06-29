import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Account } from '../../model/account';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css'],
})
export class AccountInfoComponent implements OnInit {

  account: Account;
  numDonatedCharities: number;
  constructor(private authenticationService: AuthenticationService,
              private  route: ActivatedRoute) {

        this.authenticationService.ready.subscribe(() => {
          this.authenticationService.getUser().subscribe((user) => {
            console.log('hi');
            console.log(user);
            // this.numDonatedCharities = Object.keys(this.account.donatedCharities).length;
        });
        });
    }

  ngOnInit() {}
}
