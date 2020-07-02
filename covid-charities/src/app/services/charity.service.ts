import { Injectable, EventEmitter } from '@angular/core';
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
  ready = new EventEmitter();

  tagCharities: Charity[] = [];

  constructor(private db: AngularFireDatabase) {
    this.db.list(this.dbPath).snapshotChanges().subscribe(item => {
      item.forEach(element => {
        const y = element.payload.toJSON();
        this.charities.push(y as Charity);
      });
      this.ready.emit(null);
    });
  }

  getCharity(name: string): Charity {
    for (const charity of this.charities) {
      if (charity.name === name) {
        return charity;
      }
    }
  }

  getCharityByTag(tag: string): Charity[] {
    this.tagCharities = [];
    for (const charity of this.charities) {
      console.log(charity);
      Object.keys(charity.tags).forEach(key => {
        if (charity.tags[key] === tag) {
          this.tagCharities.push(charity);
        }
      });
    }
    return this.tagCharities;
  }
}
