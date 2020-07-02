import { Component, OnInit } from '@angular/core';
import { Charity } from 'src/app/model/charity';
import { CharityService } from '../../services/charity.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  public tags: string[] = [
                            'COVID-19',
                            'Civil Rights',
                            'Food',
                            'Health',
                            'Human Services',
                            'International',
                            'Research',
                          ];
  public charities: Charity[];
  constructor(private charityService: CharityService) {}

  ngOnInit() {
    this.charities = this.charityService.charities;
  }

}
