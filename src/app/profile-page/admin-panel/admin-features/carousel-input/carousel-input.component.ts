import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'carousel-input',
  templateUrl: './carousel-input.component.html',
  styleUrls: ['./carousel-input.component.css']
})
export class CarouselInputComponent {
  carouselData = this.dta.getCarousel();
  newData = '';
  confirmationModal = false;
  submit(){
    this.confirmationModal = true;
  }
  checkConfirmation(confirmation: boolean){
    if(confirmation){
      if(this.newData !== ""){
        this.carouselData.push(this.newData.trim());
        this.newData = '';
      }
      this.carouselData = this.carouselData.filter((str) => str !== '');
      this.submitToDatabase(this.carouselData);
    }
    this.confirmationModal = false;

    
  }

  submitToDatabase(carouselData: any){
    this.dta.patchData({
      carouselImages: carouselData
    }, 'Admin')
    this.dta.setCarousel(carouselData);
  }
  trackByFn(index: any, item: any) {
    return index;
 }
  constructor(private dta: DataService){}
}
