import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  account: Account;
  constructor() {
    this.account = new Account('Anand Chandra',
      ['World Health Organization', 'Project Hope'],
      [123, 5],
      ['2012-04-23', '2012-04-23'],
      ['123456789'],
      'https://i.ibb.co/x1f3CYh/profile-1.png');
  }

  getAccount(): Observable<Account> {
    return new Observable<Account>((observable) => {
      observable.next(this.account);
      observable.complete();
    });
  }
}
