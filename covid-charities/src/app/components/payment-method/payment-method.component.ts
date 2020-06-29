import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';

import { Account, paymentMethod } from '../../model/account';
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
  CVV: number;
  cardForm: FormGroup;
  paymentMethod: paymentMethod[] = [];

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute) {
      this.authenticationService.ready.subscribe(() => {
        if (this.authenticationService.currentUser != null) {
          this.authenticationService.getUser().subscribe((val) => {
            this.paymentMethod.push(val.payment_methods);
            this.account = new Account(val.first_name,
                                      val.last_name,
                                      val.interests,
                                      val.donation_history,
                                      val.profile_image,
                                      val.total_amount_donated,
                                      val.email_address,
                                      val.user_ID,
                                      this.paymentMethod);
          });
        }
      });
    }

  ngOnInit() {
    this.cardForm = new FormGroup({
      fullName: new FormControl(this.fullName, Validators.required),
      cardNumber: new FormControl(this.cardNumber, [Validators.required]),
      expDate: new FormControl(this.expDate, [Validators.required]),
      CVV: new FormControl(this.CVV, [Validators.required]),
    });
  }

  onSubmit(form: NgForm): void {
    this.addCard();
    this.fullName = '';
    this.cardNumber = null;
    this.expDate = '';
    this.CVV = null;
  }

  addCard() {
    this.authenticationService.addPayment(this.fullName,
      this.cardNumber, this.expDate, this.CVV);
  }

}
