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
        summary: '',
        money: ''
      }),
      Charity.JSONtoObj({
        name: 'Project HOPE',
        description:
          'For more than 60 years, Project HOPE has transformed the health and well-being of people and communities around the world. We work on the front lines of the world’s health challenges, partnering hand-in-hand with communities, health care workers and public health systems to ensure sustainable change.',
        tags: ['COVID-19', 'Health', 'Human Services', 'International'],
        coverPhoto:
          'https://www.projecthope.org/wp-content/uploads/2019/09/standard-sharing-link-previw-card.png',
        additionalPhotos: [
          'https://www.projecthope.org/wp-content/uploads/2020/03/COVID19-Help-card-1b.png',
          'https://www.projecthope.org/wp-content/uploads/2020/03/Financial-accountability-graphic-92-Nov-2019.png',
          'https://www.projecthope.org/wp-content/uploads/2019/12/Indonesia-MNCH.png',
        ],
        donationTiers: [5, 10, 15, 25],
        summary: 'Project HOPE works in five main areas: disasters and health crises; infectious diseases; noncommunicable diseases; maternal, neonatal and child health; and health policy.',
        money: 'More than 92 percent of our expended resources — among the highest of all philanthropic organizations — support our lifesaving health projects around the world. Less than eight percent of expended resources go toward management and fundraising costs.'
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
        summary: '',
        money: ''
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
        summary: '',
        money: ''
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
