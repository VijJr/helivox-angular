import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/services/dta.service';
import { AuthService } from './shared/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    this.auth.autoLogin();
    
  }
  title = 'helivox';

  constructor(public dta: DataService, private auth: AuthService){}
}
