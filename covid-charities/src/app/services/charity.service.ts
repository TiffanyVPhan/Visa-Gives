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
        tags: ['COVID-19', 'Health', 'Research', 'International'],
        coverPhoto:
          'https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg',
        additionalPhotos: [],
        donationTiers: [5, 10, 15, 25],
      }),
      Charity.JSONtoObj({
        name: 'Project HOPE',
        description:
          'For more than 60 years, Project HOPE has transformed the health and well-being of people and communities around the world. We work on the front lines of the world’s health challenges, partnering hand-in-hand with communities, health care workers and public health systems to ensure sustainable change.',
        tags: ['COVID-19', 'Health', 'Human Services', 'International'],
        coverPhoto:
          'data:image/png;base64,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',
        additionalPhotos: [],
        donationTiers: [5, 10, 15, 25],
      }),
      Charity.JSONtoObj({
        name: 'St. Judes',
        description:
          'St. Jude is leading the way the world understands, treats and defeats childhood cancer and other life-threatening diseases.',
        tags: ['Health', 'Human Services', 'Research'],
        coverPhoto:
          'https://wrcb.images.worldnow.com/images/19279667_G.jpeg?auto=webp&disable=upscale&height=560&fit=bounds&lastEditedDate=1584892203000',
        additionalPhotos: [],
        donationTiers: [5, 10, 15, 25],
      }),
      Charity.JSONtoObj({
        name: 'Americares',
        description:
          'Americares is a health-focused relief and development organization that responds to people affected by poverty or disaster with life-changing medicine, medical supplies and health programs.',
        tags: ['COVID-19', 'Health', 'International'],
        coverPhoto:
          'data:image/png;base64,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',
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
