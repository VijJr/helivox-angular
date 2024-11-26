import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'schools-input',
  templateUrl: './schools-input.component.html',
  styleUrls: ['./schools-input.component.css']
})
export class SchoolsInputComponent {
  schools = this.dta.getAllSchools();
  states = Object.keys(this.schools);

  selected = 0;

  newState = '';
  newSchool = new Array(this.states.length).fill('');

  confirmationModal = false;

  deleteState = false;

  submit(){
    this.confirmationModal = true;
  }

  deleteS(){
    this.confirmationModal = true;
    this.deleteState = true;
  }

  checkConfirmation(conf: boolean){

    if(this.deleteState){
      this.deleteState = false;
      if(conf){
        delete this.schools[this.states[this.selected]];
        this.states = Object.keys(this.schools);
        this.submitToDatabase(this.schools);
      }
    }
    else if(conf){
      if(this.newState !== ''){
        this.schools[this.newState.trim()] = [];
        this.states = Object.keys(this.schools);
        this.newState = '';
      }
      for(let j = 0; j < this.newSchool.length; j++){
        if(this.newSchool[j] !== ''){
          this.schools[this.states[j]].push(this.newSchool[j].trim());
          this.newSchool[j] = '';
        }
      }
  
      for(let i = 0; i < this.states.length; i++){
        this.schools[this.states[i]] = this.schools[this.states[i]].filter((str) => str !== '');
      }
      this.submitToDatabase(this.schools);
    }

    this.confirmationModal = false;
  }

  submitToDatabase(schools: any){
    this.dta.patchData({
      schools: schools
    }, 'Admin')
    this.dta.setAllSchools(schools);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  constructor(private dta: DataService){}
}
