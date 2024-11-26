import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  
  rolesList = ['User', 'Volunteer', 'Editor', 'Admin'];

  user = this.dta.getUser();

  constructor(private dta: DataService){}

}
