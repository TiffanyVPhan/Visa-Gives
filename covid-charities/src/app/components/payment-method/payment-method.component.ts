import { Component, OnInit, EventEmitter } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  updateCard: FormGroup;
  edit = false;
  bgColor = '#A1E9FF';

  ready2 = new EventEmitter();

  constructor(private authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private http: HttpClient) {
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
            this.ready2.emit(null);
            console.log(this.account.payment);
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
      this.ready2.emit(null);
      console.log(this.account.payment);
    });

    this.ready2.subscribe(() => {
      if (this.account.payment !== undefined) {
        this.updateCard = new FormGroup({
          fullName: new FormControl(this.account.payment[0].card_holder, Validators.required),
          cardNumber: new FormControl(this.account.payment[0].card_number, [Validators.required]),
          expDate: new FormControl(this.account.payment[0].exp_, [Validators.required]),
          CVV: new FormControl(this.account.payment[0].cvv_, [Validators.required]),
        });
      }
    });
  }

  onSubmit(form): void {
    this.addCard();
    this.fullName = '';
    this.cardNumber = null;
    this.expDate = '';
    this.CVV = null;
  }

  addCard() {
    this.authenticationService.addPayment(this.fullName,
      this.cardNumber, this.expDate, this.CVV);
    this.createAlias();
  }

  onEdit() {
    this.edit = !this.edit;
  }

  deleteCard() {
    this.authenticationService.removePayment();
  }

  updateCardInfo() {
    console.log(this.account.payment[0]);
    this.authenticationService.addPayment(
      this.account.payment[0].card_holder,
      this.account.payment[0].card_number,
      this.account.payment[0].exp_,
      this.account.payment[0].cvv_
    );
    this.onEdit();
  }

  createAlias() {
    const payload = {
      'email': this.account.email,
      'recipientPrimaryAccountNumber': '4895140000066666'
    };
    this.http.post('https://visa-gives.herokuapp.com/create-alias/', payload).subscribe((response) => {
      console.log(response);
    });
  }

  updateColor(color: string) {
    this.bgColor = color;
  }

  getColor() {
    return this.bgColor;
  }
}
