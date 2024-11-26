import { Component, Input } from '@angular/core';
import { DataService } from '../shared/services/dta.service';

@Component({
  selector: 'dropdown-alert',
  templateUrl: './dropdown-alert.component.html',
  styleUrls: ['./dropdown-alert.component.css']
})
export class DropdownAlertComponent {
  @Input() color;
  @Input() text;
  
  constructor(public dta: DataService){}
}
