import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'volunteer-features',
  templateUrl: './volunteer-features.component.html',
  styleUrls: ['./volunteer-features.component.css']
})
export class VolunteerFeaturesComponent implements OnInit{
  volData = [];
  isOpen = false;
  selected = -1;

  user = this.dta.getUser();

  name = this.user.name;

  ngOnInit(): void {
    this.volData = this.dta.getVolQuests();
  }
  
  submitName(){
    const list = this.dta.getAbout();
    if(list.Member === null || list.Member === undefined){
      list.Member = [this.name];
    }
    else if(list.Member.indexOf(this.user.name) !== -1){
      list.Member.splice(list.Member.indexOf(this.user.name), 1, this.name);
    }
    else{
      list.Member.push(this.name);
    }
    this.dta.getUser().name = this.name;
    this.dta.postData(list.Member, 'About/Volunteer');
    this.dta.patchData({name: this.name}, "Users/" + this.user.uid);
    this.dta.setAbout(list);
    this.dta.setAlertData('Success!', true, '#07E607');

  }

  constructor(private dta: DataService){}

}
