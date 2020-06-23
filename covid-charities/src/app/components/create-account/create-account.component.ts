import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Account } from '../../model/account';
import { AccountService } from '../../services/account.service';

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

  accountForm = new FormGroup({
     first: new FormControl(this.firstName, Validators.required),
     last: new FormControl(this.lastName, [Validators.required]),
     pass: new FormControl(this.password, [Validators.required]),
     confirm: new FormControl(this.confirmPassword, [Validators.required]),
     email_: new FormControl(this.email, [Validators.required]),
     profilePicture: new FormControl(this.image)
   });
  constructor(private accountService: AccountService,
              private fb: FormBuilder) {}

  ngOnInit() {
    // this.accountForm = this.fb.group({
    //   firstName: ['', Validators.required],
    //   lastName: ['', Validators.required],
    //   password: ['', Validators.required],
    //   confirmPassword: ['', Validators.required],
    //   email: ['', Validators.required]
    // });
    console.log(this.accountForm);
  }

  onSubmit(): void {
    // TO-DO: this probably pings backend to create a new account
    console.log(this.accountForm.value);
    this.submit = true;
  }
}
