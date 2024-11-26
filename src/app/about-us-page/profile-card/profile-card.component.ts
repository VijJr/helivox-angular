import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent {
  user = this.dta.getUser();

  @Input() person: any;
  constructor(private dta: DataService){}
}
