import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'editor-features',
  templateUrl: './editor-features.component.html',
  styleUrls: ['./editor-features.component.css']
})
export class EditorFeaturesComponent implements OnInit {
  user = this.dta.getUser();

  name = this.user.name;

  isOpen = false;
  selected = -1;

  volData = [];

  buttonClicked = false;

  volDataOriginal: any;

  

  ngOnInit(): void {
    this.http.get('https://helivox-2-default-rtdb.firebaseio.com/Volunteer_Submissions.json?auth=' + this.dta.getUser().token).subscribe((volData) => {
      this.volDataOriginal = volData;
      for(let i = 0; i < Object.keys(volData).length; i++){
        for(let j = 0; j < volData[Object.keys(volData)[i]].length; j++){
          this.volData.push(volData[Object.keys(volData)[i]][j]);
        }
      }
    });
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
    this.dta.postData(list.Member, 'About/Editor');
    this.dta.patchData({name: this.name}, "Users/" + this.user.uid);
    this.dta.setAbout(list)
    this.dta.setAlertData('Success!', true, '#07E607');

  }

  editVolData(approved: boolean, i: number){
    if(approved){
      this.dta.getData(this.volData[i].catalog).subscribe((data: any[]) => {
        this.dta.patchData(this.volData[i], this.volData[i].catalog + "/" + (data.length));
      })
    }
    else {
      for(let j = 0; j < this.volDataOriginal[Object.keys(this.volDataOriginal)[i]].length; j++){
        if(this.volData[i] === this.volDataOriginal[Object.keys(this.volDataOriginal)[i]][j]){
          this.dta.deleteData(Object.keys(this.volDataOriginal)[i] + "/" + j, 'Volunteer_Submissions');
        }
      }
    }
    this.volData.splice(i, 1)
    setTimeout(() => {
      this.buttonClicked = false;
    }, 200)
  }


  constructor(private dta: DataService, private http: HttpClient){}
}
