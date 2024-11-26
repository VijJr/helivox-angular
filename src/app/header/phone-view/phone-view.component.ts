import { Component, OnInit } from '@angular/core';
import { DropdownService } from 'src/app/shared/services/dropdown.service';

@Component({
  selector: 'phone-view',
  templateUrl: './phone-view.component.html',
  styleUrls: ['./phone-view.component.css']
})
export class PhoneViewComponent implements OnInit {
  isOpen: boolean = false;

  ngOnInit(): void {
    this.dpdnService.buttonEmitter.subscribe(isOpen => {
      this.isOpen = isOpen;
    })
  }

  constructor(private dpdnService: DropdownService){}
}
