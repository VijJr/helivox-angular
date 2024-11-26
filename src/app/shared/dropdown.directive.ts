import { Directive, HostListener, HostBinding, OnInit, EventEmitter } from '@angular/core';
import { DropdownService } from './services/dropdown.service';

@Directive({
    selector: '[app-dropdown]'
})
export class DropdownDirective implements OnInit{
    @HostBinding('class.current') isOpen = false;

    @HostBinding('class.current') pageOpen = false;

    

    ngOnInit(): void {
       this.ddService.buttonEmitter.subscribe(isOpen => { 
        this.isOpen = isOpen;
       })

       this.ddService.pageChecker.subscribe(pageOpen => {
        this.pageOpen = pageOpen;
       })
    
    }
    
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
        this.ddService.buttonEmitter.emit(this.isOpen);
    }
    constructor(private ddService: DropdownService) {}
}