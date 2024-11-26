import { Component, OnInit } from '@angular/core';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent implements OnInit {

  catalogs = [];
  states = [];
  schools = [];

  currentCatalog = 0;
  currentState = 0;


  ngOnInit(): void {
    this.catalogs = this.dta.getCatalogs();
    this.states = this.dta.getStates();
    this.changeSchool();
  }

  changeSchool(){
    this.schools = this.dta.getSchools(this.states[this.currentState]);

  }

  resetDpdn(){
    this.ddService.update(false);
    // this.currentCatalog = 0;
    // this.currentState = 0;
    // this.changeSchool();
  }

  constructor(private dta: DataService, private ddService: DropdownService){}


}
