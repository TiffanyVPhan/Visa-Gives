import { Component, OnInit } from '@angular/core';

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

  public featureImage: string = "https://quincy-network.s3.ca-central-1.amazonaws.com/wp-content/uploads/sites/3/2020/05/World-Health-Organization-MGN.jpg";
  public name: string = "Nonprofit Name"
  
  constructor() { }

  ngOnInit() {
  }

}
