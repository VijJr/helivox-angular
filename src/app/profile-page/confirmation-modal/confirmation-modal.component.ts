import { Component, EventEmitter, HostListener, Output } from '@angular/core';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})
export class ConfirmationModalComponent {
  @Output() confirmation = new EventEmitter<boolean>();
  clickedBox = false;

  sendOutput(e: boolean){
    this.confirmation.emit(e);
  }

  checkIfClicked(){
    if(!this.clickedBox){
      this.sendOutput(false);
    }
    this.clickedBox = false;
  }

}
