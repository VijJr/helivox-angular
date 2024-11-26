import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'tags-input',
  templateUrl: './tags-input.component.html',
  styleUrls: ['./tags-input.component.css']
})
export class TagsInputComponent {
  tags = this.dta.getAllTags();
  categories = Object.keys(this.tags);

  selected = 0;

  newCategory = '';
  newTags = new Array(this.categories.length).fill('');

  confirmationModal = false;

  deleteCategory = false;

  submit(){
    this.confirmationModal = true;
  }

  deleteC(){
    this.confirmationModal = true;
    this.deleteCategory = true;
  }

  checkConfirmation(conf: boolean){

    if(this.deleteCategory){
      this.deleteCategory = false;
      if(conf){
        delete this.tags[this.categories[this.selected]];
        this.categories = Object.keys(this.tags);
        this.submitToDatabase(this.tags);
      }
    }
    else if(conf){
      if(this.newCategory !== ''){
        this.tags[this.newCategory.trim()] = [];
        this.categories = Object.keys(this.tags);
        this.newCategory = '';
      }
      for(let j = 0; j < this.newTags.length; j++){
        if(this.newTags[j] !== ''){
          this.tags[this.categories[j]].push(this.newTags[j].trim());
          this.newTags[j] = '';
        }
      }
  
      for(let i = 0; i < this.categories.length; i++){
        this.tags[this.categories[i]] = this.tags[this.categories[i]].filter((str) => str !== '');
      }
      this.submitToDatabase(this.tags);
    }

    this.confirmationModal = false;
  }

  submitToDatabase(tags: any){
    this.dta.patchData({
      tags: tags
    }, 'Admin')
    this.dta.setAllTags(tags);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
  constructor(private dta: DataService){}
}
