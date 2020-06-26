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
              private angularFireAuth: AngularFireAuth) {

    this.authState = angularFireAuth.authState;

    this.authState.subscribe(user => {
      if (user) {
        this.db.list('/Personal_Data')
        .snapshotChanges()
        .subscribe(item => {
          item.forEach(element => {
            const y = element.payload.toJSON();
            this.users.push(new Account(
              y['Name'], y['DonatedCharities'],
              y['DonatedAmount'], y['DonatedDates'],
              y['PaymentMethod'], y['ProfilePicture'],
              y['Email']
            ));
            this.email = authenticationService.account.email;
          });
          for (const x of this.users) {
            if (x.email === this.email) {
              this.currentUser = x;
            }
          }
          this.ready.emit(null);
        });
      }
    },
      err => {
       console.log('Something went wrong with authState: ', err);
      });
  }

  getAccount(): Observable<Account> {
    return new Observable<Account>((observable) => {
      observable.next(this.account);
      observable.complete();
    });
  }
}
