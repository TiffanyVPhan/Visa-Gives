import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  accountForm: FormGroup;
  errMsg: string;

  constructor(private fb: FormBuilder,
              public authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.accountForm = new FormGroup({
      email_: new FormControl(this.email, [Validators.required]),
      password_: new FormControl(this.password)
    });
  }

  onSubmit(form): void {
    this.authenticationService.signIn(this.email, this.password);
    this.email = '';
    this.password = '';
  }

}
