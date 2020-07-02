import { Component, OnInit } from '@angular/core';
import { Charity } from 'src/app/model/charity';
import { CharityService } from 'src/app/services/charity.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-tag-filter',
  templateUrl: './tag-filter.component.html',
  styleUrls: ['./tag-filter.component.css']
})
export class TagFilterComponent implements OnInit {
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
  public tag: string;
  constructor(private charityService: CharityService,
              private route: ActivatedRoute) {
    this.charityService.ready.subscribe(() => {
      this.charities = this.charityService.getCharityByTag(this.tag);
      console.log(this.charities);
    });

  }

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.tag = params.get('tag');
      this.charities = this.charityService.getCharityByTag(this.tag);
      console.log(this.charities);
    });
  }

}
