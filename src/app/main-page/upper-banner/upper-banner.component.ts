import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'upper-banner',
  templateUrl: './upper-banner.component.html',
  styleUrls: ['./upper-banner.component.css']
})
export class UpperBannerComponent {


  constructor(private dta: DataService){}
}
