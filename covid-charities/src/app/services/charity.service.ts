import { Injectable } from '@angular/core';
import { Charity } from '../model/charity';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharityService {
  charities: Charity[];
  constructor() {
    this.charities = [
      Charity.JSONtoObj({
        name: 'World Health Organization',
        description:
          'Donations support WHO’s work, including with partners, to track and understand the spread of the virus; to ensure patients get the care they need and frontline workers get essential supplies and information; and to accelerate research and development of a vaccine and treatments for all who need them.',
        tags: ['Health', 'Research', 'International'],
        coverPhoto:
          'https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg',
        additionalPhotos: [],
        donationTiers: [5, 10, 15, 25],
      }),
      Charity.JSONtoObj({
        name: 'World Health Organization',
        description:
          'Donations support WHO’s work, including with partners, to track and understand the spread of the virus; to ensure patients get the care they need and frontline workers get essential supplies and information; and to accelerate research and development of a vaccine and treatments for all who need them.',
        tags: ['Health', 'Human Services', 'Research', 'International'],
        coverPhoto:
          'https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg',
        additionalPhotos: [],
        donationTiers: [5, 10, 15, 25],
      }),
      Charity.JSONtoObj({
        name: 'St. Judes',
        description:
          'Donations support WHO’s work, including with partners, to track and understand the spread of the virus; to ensure patients get the care they need and frontline workers get essential supplies and information; and to accelerate research and development of a vaccine and treatments for all who need them.',
        tags: ['Health', 'Human Services', 'Research'],
        coverPhoto:
          'https://wrcb.images.worldnow.com/images/19279667_G.jpeg?auto=webp&disable=upscale&height=560&fit=bounds&lastEditedDate=1584892203000',
        additionalPhotos: [],
        donationTiers: [5, 10, 15, 25],
      }),
      Charity.JSONtoObj({
        name: 'World Health Organization',
        description:
          'Donations support WHO’s work, including with partners, to track and understand the spread of the virus; to ensure patients get the care they need and frontline workers get essential supplies and information; and to accelerate research and development of a vaccine and treatments for all who need them.',
        tags: ['Environment', 'Research', 'International'],
        coverPhoto:
          'https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg',
        additionalPhotos: [],
        donationTiers: [5, 10, 15, 25],
      }),
    ];
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
