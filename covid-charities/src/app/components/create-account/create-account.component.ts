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
  submit = false;
  accountForm: FormGroup;
  account: Account;
  userID: string;

  private file: File;
  public imageSrc;

  constructor(private accountService: AccountService,
              public authenticationService: AuthenticationService,
              private fb: FormBuilder) {
      this.authenticationService.ready.subscribe(() => {
        this.userID = this.authenticationService.userID;
      })
  }

  ngOnInit() {
    this.accountForm = new FormGroup({
      first: new FormControl(this.firstName, Validators.required),
      last: new FormControl(this.lastName, [Validators.required]),
      pass: new FormControl(this.password, [Validators.required]),
      confirm: new FormControl(this.confirmPassword, [Validators.required]),
      email_: new FormControl(this.email, [Validators.required])
    });
    console.log(this.accountForm);
    // console.log(this.authenticationService.userData);
  }

  onSubmit(form: NgForm): void {
    this.account = new Account(
      this.firstName, this.lastName, ['health'], [], this.imageSrc, 0,
      this.email, null, null);
    this.authenticationService.signUp(this.email, this.password, this.account);
    this.email = '';
    this.password = '';
    console.log(form);
    this.submit = !this.submit;
  }

  setImage(event: Event) {
    this.file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(this.file);
  }
}
