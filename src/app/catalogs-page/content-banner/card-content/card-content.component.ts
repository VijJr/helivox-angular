import { Component, Input, OnInit, OnDestroy} from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/shared/services/dta.service';
import { User } from 'src/app/shared/templates/user';

@Component({
  selector: 'card-content',
  templateUrl: './card-content.component.html',
  styleUrls: ['./card-content.component.css']
})
export class CardContentComponent implements OnInit, OnDestroy {

  @Input() selected: string;
  @Input() activeFilters: string[];
  @Input() searchText: string;
  @Input("catalogCategory") catalogCategory;

  catalogData = []
  inputs = [];

  isOpen: boolean = false;
  openedCatalog: number;


  unloaded = true;
  subscription: Subscription;


  ngOnInit(): void {

    // If they change the catalog data on the page 
    this.subscription = this.route.params.subscribe((params: Params) => {
      this.unloaded = true;
      this.data.getData(this.catalogCategory.catalog).subscribe((response: any[]) => {
        this.catalogData = response === null ? [] : response;
        this.data.getData("Inputs").subscribe((inputs: any[]) => {
          this.unloaded = false;
          this.inputs = inputs;
        }, (err) => {})

      }, (err) => {this.unloaded = false;})

    })



    // this.subscription = this.route.params.subscribe((params: Params) => {
    //   this.unloaded = true;
    //   this.data.getData(this.catalogCategory.catalog).subscribe((response: any[]) => {
    //     this.catalogData = response;
    //     this.unloaded = false;
    //   })

    // }, (err) => {this.unloaded = false;})





  }

  isEditorMode(){
    return this.data.editorMode;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  checkIfRating(i: number){
    if(this.inputs[i] !== undefined){
      if(this.inputs[i].rating !== undefined){
        return this.inputs[i].rating;
      }
    }
    return 0;

  }

  openModal(i: number){
    this.openedCatalog = i;
    this.isOpen = true;
    
  }
  closeModal(){
    this.isOpen = false;
  }

  passesTags(i: number){

    if(this.catalogData[i].school !== this.catalogCategory.school){
      return false;
    }
    if(!this.catalogData[i].title.toLowerCase().includes(this.searchText.toLowerCase())){
      return false;
    }
    if(this.catalogData[i].category.toLowerCase() !== this.selected.toLowerCase()){
      return false;
    }
    if(!(this.catalogData[i].labels.includes(this.activeFilters[2])) && this.activeFilters[2] != "Tags"){
      return false
    }
    if(!this.checkIfInRange(this.activeFilters[0], this.catalogData[i].tags[0])  && this.activeFilters[0] != "Hours"){
      return false;
    }
    if(this.activeFilters[1] != "Cost" && !this.checkIfInRange(this.activeFilters[1], this.catalogData[i].tags[1]) ){
      return false;
    }

    if((this.activeFilters[3] != "Rating" && this.inputs[i] === undefined)){
      return false;
    }

    else{
      if(this.inputs[i] !== undefined){
        if(this.inputs[i].rating === undefined){
          return false
        }
      }

      if((this.activeFilters[3] === "Outstanding") && !(this.inputs[i].rating >= 4)){
        return false
      }
      if((this.activeFilters[3] === "Superior") && !(this.inputs[i].rating >= 3 && this.inputs[i].rating < 4)){
        return false
      }
    }

    return true;
  }

  checkIfInRange(range: String, value: number){
    if(range.includes("+")){
      range = range.replace("$", "").replace("+" , "");
      if(value > Number(range)){
        return true;
      }
      return false;
    }
    else if(range.includes("-")){
      const setOfVals = range.split("-");
      setOfVals[0] = setOfVals[0].replace("$", "");

      if(value >= Number(setOfVals[0]) && value <= Number(setOfVals[1])){
        return true;
      }
    }
    else{
      if(value === Number(range.replace("$", ""))){
        return true;
      }
    }
    
    return false;
  }


  constructor(private data: DataService, private route: ActivatedRoute){}
}
