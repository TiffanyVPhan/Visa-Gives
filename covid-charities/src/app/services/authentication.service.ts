import { Injectable, EventEmitter } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Account } from '../model/account';
import { Observable } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';


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
  public numDonation: number;
  userID: any;
  list: any;
  numCards = 0;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              public db: AngularFireDatabase, private http: HttpClient) {
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
        this.router.navigate(['/create-account']);
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

  removePayment() {
    this.db.list('Users/' + this.userID + `/payment_methods/`).remove('0');
    this.router.navigate(['/payment-methods']);
  }

  // Adds donation to user database
  addDonation(name: string, amount_: number, date_: string, numDonation: number) {
    this.db.object(`Users/${this.userID}/donation_history/${numDonation}`).set({
          amount: amount_,
          charity_name: name,
          date_donated: date_
    })
    .then(() => {
      console.log('Successfully added donation to database');
    })
    .catch(error => {
      console.log('Something went wrong: ', error);
    });
  }
  
  resetPassword(email: string) {
    return this.angularFireAuth.sendPasswordResetEmail(email)
      .then(() => console.log('Sent Password Reset Email'))
      .catch((error) => console.log(error));
  }

  removeUser() {
    this.db.list('Users/').remove(this.userID);
    this.currentUser.delete();
    this.router.navigate(['/']);
  }
}
