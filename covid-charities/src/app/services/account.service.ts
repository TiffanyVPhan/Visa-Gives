import { Injectable, EventEmitter } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Account } from '../model/account';
import { AuthenticationService } from './authentication.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account: Account;
  email: string;
  users: Account[] = [];
  currentUser: Account;
  ready = new EventEmitter();
  private authState: Observable<firebase.User>;

  constructor(private authenticationService: AuthenticationService,
              private db: AngularFireDatabase,
              private angularFireAuth: AngularFireAuth) {}

}
