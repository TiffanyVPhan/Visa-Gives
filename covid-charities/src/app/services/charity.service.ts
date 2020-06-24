import { Injectable } from '@angular/core';
import { Charity } from '../model/charity';
import { Observable, observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class CharityService {
  charities: Charity[] = [];
  dbPath = '/Charity';
  constructor(private db: AngularFireDatabase) {

    this.db.list(this.dbPath).snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const y = element.payload.toJSON();
        // console.log(y);
        this.charities.push(y as Charity);
      });
      console.log(this.charities);
      console.log(this.charities[0]);
    });

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
