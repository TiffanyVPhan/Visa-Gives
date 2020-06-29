import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';

import { Account } from '../../model/account';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  account: Account;
  fullName: string;
  cardNumber: number;
  expDate: string;
  CVC: number;
  cardForm: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
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

  ngOnInit() {
    this.cardForm = new FormGroup({
      fullName: new FormControl(this.fullName, Validators.required),
      cardNumber: new FormControl(this.cardNumber, [Validators.required]),
      expDate: new FormControl(this.expDate, [Validators.required]),
      CVC: new FormControl(this.CVC, [Validators.required]),
    });
  }

}
