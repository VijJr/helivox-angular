import { Component, OnInit } from '@angular/core';
import { DropdownService } from 'src/app/shared/services/dropdown.service';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'phone-dropdown',
  templateUrl: './phone-dropdown.component.html',
  styleUrls: ['./phone-dropdown.component.css']
})
export class PhoneDropdownComponent implements OnInit{

  catalogs = [];
  states = [];
  schools = [];

  currentCatalog = 0;
  currentState = 0;


  clicked = false;


  ngOnInit(): void {
    this.catalogs = this.dta.getCatalogs();
    this.states = this.dta.getStates();
    this.schools = this.dta.getSchools(this.states[0]);
  }

  checkIsUser(){
    return this.dta.getUser().role >= 0;
  }

  
  closeDropdown(){
    this.ddService.update(false);
  }

  changeSchool(){
    this.schools = this.dta.getSchools(this.states[this.currentState]);

  }
  resetDpdn(){
    this.ddService.update(false);
    this.currentCatalog = 0;
    this.currentState = 0;
    this.changeSchool();
  }

  constructor(private dta: DataService, private ddService: DropdownService){}
}

