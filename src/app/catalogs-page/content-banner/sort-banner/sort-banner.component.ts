import { Component, EventEmitter, Output } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'sort-banner',
  templateUrl: './sort-banner.component.html',
  styleUrls: ['./sort-banner.component.css']
})
export class SortBannerComponent {
  @Output() category = new EventEmitter<string>();

  types = this.data.getTypes();
  selected = this.types[0];



  constructor(private data: DataService){}

}
