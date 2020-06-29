import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private authState: Observable<firebase.User>;
  public currentUser: firebase.User = null;
  ready = new EventEmitter();

  public loggedIn = false;
  public errMsg = '';
  public user: Account;
  userID: any;
  list: any;
  numCards = 0;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              public db: AngularFireDatabase) {
    this.authState = angularFireAuth.authState;

    this.authState.subscribe(user => {
      if (user != null) {
        this.userID = user.uid;
        this.currentUser = user;
        console.log('Successfully authenticated');
        console.log('AUTHSTATE USER', user);
        this.loggedIn = true;
        this.ready.emit(null);
      } else {
        console.log('AUTHSTATE USER EMPTY', user);
        this.currentUser = null;
      }
    },
    err => {
      console.log('Something went wrong with authState: ', err);
    });
  }

  signUp(email: string, password: string, acc: Account) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then( (res: any) => {
        console.log(res.user.uid);
        console.log('Successfully signed up!', res);
        this.newUser(acc, res.user.uid);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message);
        this.errMsg = error.message;
      });
  }

  // Create new user entry in database
  newUser(acc: Account, uid: string) {
    const itemRef = this.db.object(`Users/${uid}`).set({
      first_name: acc.firstName,
      last_name: acc.lastName,
      interests: acc.interests,
      email_address: acc.email,
      user_ID: uid,
      total_amount_donated: acc.totalAmountDonated,
      profile_image: acc.profilePicture,
      donation_history: acc.donationHistory
    })
    .then(() => {
      console.log('Successfully created user in database');
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }

  signIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log('Successfully signed in!');
        this.router.navigate(['/']);
        this.loggedIn = true;
      })
      .catch(error => {
        console.log('Something went wrong: ', error.message);
      });
  }

  signOut() {
    this.angularFireAuth.signOut().then(() => {
      this.router.navigate(['/']);
    });

    this.loggedIn = false;
    location.reload();
    console.log('Signed Out');
  }

  getUser() {
    return this.db.object('Users/' + this.userID).valueChanges();
  }

  addDonation(money: number, id: string, date: string) {
    this.db.list('Users/' + this.userID).push({
      amount: money,
      charity_id: id,
      date_donated: date
    });
  }

  addPayment(name: string, cardInfo: number, exp: string, cvv: number) {
    this.db.object('Users/' + this.userID + `/payment_methods/${this.numCards}`).set({
      card_holder: name,
      card_number: cardInfo,
      exp_: exp,
      cvv_: cvv
    })
    .then(() => {
      console.log('Successfully added card in database');
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }
}
