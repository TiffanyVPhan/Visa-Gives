import { Component, OnInit } from '@angular/core';
import { Charity } from '../model/charity';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public tags: string[] = [
                            'Animals',
                            'Arts',
                            'Community',
                            'Education',
                            'Environment',
                            'Health',
                            'Human & Civil Rights',
                            'Human Services',
                            'International',
                            'Research',
                            'Religion',
                          ];

  public featureImage: string = 'https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg';
  public name: string = 'Nonprofit Name';

  charities: Charity[];
  constructor() {
    this.charities = [
      new Charity('COVID-19 Solidarity Response Fund for WHO',
        'Donations support WHO’s work, including with partners, to track and understand the spread of the virus; to ensure patients get the care they need and frontline workers get essential supplies and information; and to accelerate research and development of a vaccine and treatments for all who need them.',
        ['Health', 'Human Services', 'Research', 'International'],
        'https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg',
        [],
        [5, 10, 15, 20]),
      new Charity('Nonprofit Name',
        'Donations support WHO’s work, including with partners, to track and understand the spread of the virus; to ensure patients get the care they need and frontline workers get essential supplies and information; and to accelerate research and development of a vaccine and treatments for all who need them.',
        ['Environment', 'Human Services', 'Research', 'International'],
        'https://mma.prnewswire.com/media/613525/St_Jude_Childrens_Research_Hospital_Logo.jpg?p=publish&w=200',
        [],
        [5, 10, 15, 20]),
      new Charity('COVID-19 Solidarity Response Fund for WHO',
        'Donations support WHO’s work, including with partners, to track and understand the spread of the virus; to ensure patients get the care they need and frontline workers get essential supplies and information; and to accelerate research and development of a vaccine and treatments for all who need them.',
        ['Health', 'Human Services', 'Research', 'International'],
        'https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg',
        [],
        [5, 10, 15, 20]),
      new Charity('COVID-19 Solidarity Response Fund for WHO',
        'Donations support WHO’s work, including with partners, to track and understand the spread of the virus; to ensure patients get the care they need and frontline workers get essential supplies and information; and to accelerate research and development of a vaccine and treatments for all who need them.',
        ['Health', 'Research'],
        'https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg',
        [],
        [5, 10, 15, 20])
    ];
  }

  ngOnInit() {
  }

}
