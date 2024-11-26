import { Component, ViewChild, ElementRef, OnInit, Renderer2, HostListener } from '@angular/core';
import { DropdownService } from '../shared/services/dropdown.service';
import { DataService } from '../shared/services/dta.service';
import { User } from '../shared/templates/user';
@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @ViewChild('dpdn') dpdn: ElementRef;


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }


  innerWidth = window.innerWidth;

  isOpen = false;
  
  editorMode = this.dta.editorMode;


  

  // Constantly checking dropdown service to see if isOpen has changed, if so the dropdown view changes

  ngOnInit(): void {
    this.ddService.buttonEmitter.subscribe(isOpen => {
      this.renderer[isOpen ? 'removeClass' : 'addClass'](this.dpdn.nativeElement, 'dpdn');
      this.isOpen = isOpen;
    })
    
  }

  checkPFP(){
    if(this.dta.getUser().profile_picture !== undefined){
      return this.dta.getUser().profile_picture;
    }
    return '../../assets/anonymous.png';
  }

  isEditor(){
    return this.dta.getUser().role >= 1;
  }
  
  checkIsUser(){
    return this.dta.getUser().role >= 0;
  }

  // If user clicks onto a new page the dropdown should go away, so this uses dropdown service to change the value of isOpen in the directive so ngOnInit can react 
  
  cancelDropdown(){
    if(this.isOpen){
      this.isOpen = !this.isOpen;
      this.renderer[this.isOpen ? 'removeClass' : 'addClass'](this.dpdn.nativeElement, 'dpdn');

      this.ddService.update(this.isOpen);
    }

  }

  changeMode(){
    this.editorMode = !this.editorMode;
    this.dta.setEditMode(this.editorMode);
  }

  constructor(private ddService: DropdownService, private renderer: Renderer2, private dta: DataService){}

}
