import { Component, Output, EventEmitter, Input, ViewChild, HostListener, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { CatalogData } from '../../../../shared/templates/catalog-data';
import { DataService } from 'src/app/shared/services/dta.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {



  // Form portion
  catalogForm: FormGroup;


  @Input() filters: any;
  @Input() selected: String;
  @Input() allCatalogData: any[];

  editorMode = this.dta.editorMode;




  //Presets

  title = null;
  hrs = null;
  cost = null;
  desc = null;
  image = null;
  link = "na"

  tagPreselect1 = null;
  tagPreselect2 = null;
  tagPreselect3 = null;


  submitElement(){
    const labelsVal = [this.catalogForm.value.tag1]
    if(this.catalogForm.value.tag2 !== null){ labelsVal.push(this.catalogForm.value.tag2)}

    if(this.catalogForm.value.tag3 !== null){ labelsVal.push(this.catalogForm.value.tag3)}

    let newDta: any;
    newDta = {
      category: this.selected.toLowerCase(),
      description: this.catalogForm.value.description,
      image: this.catalogForm.value.image,
      labels: labelsVal,
      link: this.catalogForm.value.link,
      school: this.filters.school,
      tags: [this.catalogForm.value.hours, this.catalogForm.value.cost],
      title: this.catalogForm.value.title,
      comments: [],
      rating: null
    }

    if(this.index === -1){

      this.allCatalogData.push(newDta);

    }
    
    else{
      this.allCatalogData[this.index] = newDta;

    }


    // this.dta.postData(this.allCatalogData, this.filters.catalog );
    if(this.dta.getUser().role === 1){
      let uid = this.dta.getUser().uid
      newDta['catalog'] = this.filters.catalog;
      this.dta.patchData(newDta, "Volunteer_Submissions/" + uid + "/" + this.dta.getVolQuests().length);
      let newhrCount = (this.dta.getUser().hours === undefined || this.dta.getUser().hours === null) ? 1 : ++this.dta.getUser().hours;
      console.log(newhrCount)
      this.dta.patchData({
        hours: newhrCount
      }, "Users/" + uid);
      let currentUser = this.dta.getUser();
      currentUser.hours = newhrCount;
      this.dta.setUser(currentUser);
      let list = this.dta.getVolQuests();
      list.push({uid: newDta});
      this.dta.setVolQuests(list)
    }
    else{
      newDta['catalog'] = this.filters.catalog;
      this.dta.patchData(newDta, this.filters.catalog + "/" + (this.allCatalogData.length-1));
    }

    this.openEvent.emit(true);
    this.ngOnInit();

  }

  deleteElement(){
    this.allCatalogData.splice(this.index, 1);
    this.dta.postData(this.allCatalogData, this.filters.catalog);

    this.openEvent.emit(true);

    this.ngOnInit();

  }




  // Description portion

  isOpen = true;
  notToggled = false;

  commentsToggled = false;

  userRating = -1;
  userRatingOptions = this.dta.getUserRatingOptions();
  openDropDown = false;





  @ViewChild('comments') comments: string;

  @Input() inputs: any[];
  @Input() index: number;

  @Input() volMenu: boolean;

  @Output() openEvent = new EventEmitter<boolean>();

  data = null;

  resubmit = false;

  check(){
    if(!this.notToggled && this.isOpen){
      this.openEvent.emit(true);
      
    }

    this.notToggled = false;
  }


  pushComments(){    
    let username = this.dta.getUser().getUsername()
    if(this.inputs[this.index] === undefined){
    
      this.inputs[this.index] = {
        comments: [[username, this.comments]]
      }
      
    }
    else{
      if(this.inputs[this.index].comments === undefined){
        this.inputs[this.index] = {
          comments: [[username, this.comments]],
          rating: this.inputs[this.index].rating
        }
      }
      else{
        this.inputs[this.index].comments.push([username, this.comments]);
      }
      
    }
    this.dta.patchData({
      comments: this.inputs[this.index].comments
    }, 'Inputs/' + this.index)

    this.comments = '';
  }

  verified(){
    return this.dta.getUser().role >= 0;
  }

  parseRating(rating: number){
    this.openDropDown = false;
    
    if(!this.resubmit){
      if(this.inputs[this.index] !== undefined){
        if(this.inputs[this.index].rating !== undefined){
          rating = (this.inputs[this.index].rating + rating)/2
        }
      }
      this.dta.patchData({
        rating: rating
      }, 'Inputs/' + this.index);

      this.dta.addUserRatingLog(this.index);

    }
  }

  // Global Portion 

  allowEdit(){
    return this.dta.getUser().role > 1;
  }

  constructor(private dta: DataService, private elementRef: ElementRef){}

  ngOnInit(): void {
    if(this.index != -1){
      this.data = this.allCatalogData[this.index];
    }
    this.resubmit = this.dta.checkIfResubmit(this.index);


    if(this.index !== -1 ){
      if(!this.allowEdit()){
        this.editorMode = false;
      }
      else{
        this.title = this.data.title;
        this.hrs = this.data.tags[0];
        this.cost = this.data.tags[1];
        this.link = this.data.link;
        this.desc = this.data.description;
        this.image = this.data.image;

        this.tagPreselect1 = this.data.labels[0];
        this.tagPreselect2 = this.data.labels[1];
        this.tagPreselect3 = this.data.labels[2];
      }

    }

    this.catalogForm = new FormGroup({
      'title': new FormControl(this.title, Validators.required),
      'hours': new FormControl(this.hrs, Validators.required),
      'cost': new FormControl(this.cost, Validators.required),
      'tag1': new FormControl(this.tagPreselect1, Validators.required),
      'tag2': new FormControl(this.tagPreselect2),
      'tag3': new FormControl(this.tagPreselect3),
      'link': new FormControl(this.link, Validators.required),
      'image': new FormControl(this.image, Validators.required),
      'description': new FormControl(this.desc, [Validators.required, Validators.minLength(20)])
    })
  }

  ngOnDestroy(): void {
  }
  
}
