import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Account } from '../../model/account';
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

  constructor(private  route: ActivatedRoute,
              public authenticationService: AuthenticationService) {
      this.authenticationService.ready.subscribe(() => {
        if (this.authenticationService.currentUser != null) {
          this.authenticationService.getUser().subscribe((val) => {
            this.account = new Account(val.first_name,
                                      val.last_name,
                                      val.interests,
                                      val.donation_history,
                                      val.profile_image,
                                      val.total_amount_donated,
                                      val.email_address,
                                      val.user_ID);
            console.log(this.account);
          });
        }
      });
    }

  ngOnInit() {}

}
