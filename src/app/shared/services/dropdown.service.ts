import { Injectable, EventEmitter } from '@angular/core'

@Injectable({providedIn: 'root'})


export class DropdownService {

    // Tells the viewport
    buttonEmitter = new EventEmitter<boolean>();

    // Checks if catalogs page is currently active
    pageChecker = new EventEmitter<boolean>();


    private isOpen: boolean = false;

    update(isOpen: boolean){
        this.isOpen = isOpen;
        this.buttonEmitter.emit(this.isOpen);
    }
}