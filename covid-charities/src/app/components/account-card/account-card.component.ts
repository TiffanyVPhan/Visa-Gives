import { ActivatedRoute, ParamMap } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';

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
                                '#',
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
              private  route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
    	this.accountService.getAccount()
    	.subscribe((account) => this.account = account);
    });
  }

}
