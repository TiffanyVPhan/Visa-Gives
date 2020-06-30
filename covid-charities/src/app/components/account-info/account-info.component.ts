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
  reset = false;
  delete = false;

  constructor(private authenticationService: AuthenticationService,
              private  route: ActivatedRoute) {
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
        });
      }
    });
  }

  ngOnInit() {}

  resetPassword() {
    this.authenticationService.resetPassword(this.account.email);
    this.reset = true;
    setTimeout(() => {
      this.reset = false;
      }, 3000);
  }

  trigger() {
    this.delete = true;
    setTimeout(() => {
      this.reset = false;
    }, 10000);
  }

  deleteUser() {
    this.authenticationService.removeUser();
  }
}
