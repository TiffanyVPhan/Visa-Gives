import { Injectable } from '@angular/core';
import { Charity } from '../model/charity';
import { Observable, observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class CharityService {
  charities: Charity[] = [];
  items: Observable<Charity[]> | Observable<any> | any;
  dbPath = '/Charity';
  constructor(private db: AngularFireDatabase) {

    this.db.list(this.dbPath).snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const y = element.payload.toJSON();
        // y[$key] = element.key;
        this.charities.push(y as Charity);
      });
    });
    // this.items = db.list(this.dbPath).valueChanges();
    // console.log(this.items);

    db.list('/Charity').valueChanges()
    .subscribe(items => {
      // console.log(items); // Check the returned values;
      this.items = items;
    });
  }

  findCharities() {
    return this.charities;
  }

  getAllCharities(): Observable<Charity[]> {
    return new Observable<Charity[]>((observable) => {
      observable.next(this.charities);
      observable.complete();
    });
  }

  getCharityByName(name: string): Observable<Charity> {
    return new Observable<Charity>((observable) => {
      for (const charity of this.charities) {
        if (charity.name === name) {
          observable.next(charity);
          observable.complete();
          return;
        }
      }
    });
  }
}
