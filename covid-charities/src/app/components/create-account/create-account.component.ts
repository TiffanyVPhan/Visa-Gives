import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  email: string;
  image: string;
  submit = false;
  accountForm: FormGroup;
  account: Account;

  constructor(private accountService: AccountService,
              public authenticationService: AuthenticationService,
              private fb: FormBuilder) {}

  ngOnInit() {
    this.accountForm = new FormGroup({
      first: new FormControl(this.firstName, Validators.required),
      last: new FormControl(this.lastName, [Validators.required]),
      pass: new FormControl(this.password, [Validators.required]),
      confirm: new FormControl(this.confirmPassword, [Validators.required]),
      email_: new FormControl(this.email, [Validators.required]),
      profilePicture: new FormControl(this.image)
    });
    console.log(this.accountForm);
    // console.log(this.authenticationService.userData);
  }

  onSubmit(form: NgForm): void {
    this.authenticationService.signUp(this.email, this.password);
    this.email = '';
    this.password = '';
    console.log(form);
    this.submit = !this.submit;
  }
}
