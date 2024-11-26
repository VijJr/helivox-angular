import { Component, Input } from '@angular/core';

@Component({
  selector: 'intro-banner',
  templateUrl: './intro-banner.component.html',
  styleUrls: ['./intro-banner.component.css']
})
export class IntroBannerComponent {

  @Input() catalog: string;

}
