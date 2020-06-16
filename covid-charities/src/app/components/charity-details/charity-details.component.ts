import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { CharityService } from '../../services/charity.service';
import { Charity } from 'src/app/model/charity';

@Component({
  selector: 'app-charity-details',
  templateUrl: './charity-details.component.html',
  styleUrls: ['./charity-details.component.css']
})
export class CharityDetailsComponent implements OnInit {

  charity: Charity;
  constructor(private charityService: CharityService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const charityName = params.get('charity_name');

      this.charityService.getCharityByName(charityName)
        .subscribe((charity) => this.charity = charity);
    });
  }
}
