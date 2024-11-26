import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  images = this.dta.getCarousel();
  i = 0;

  changeImg(isDecrease: boolean){
    if(isDecrease){
      this.i = this.i == 0 ? this.images.length-1 : (this.i - 1);
    }
    else{
      this.i = (this.i + 1) % this.images.length;
    
    }
  }

  constructor(private dta: DataService){}
}
