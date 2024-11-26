import { Component, ElementRef, HostListener, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit} from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'sort-panel',
  templateUrl: './sort-panel.component.html',
  styleUrls: ['./sort-panel.component.css']
})
export class SortPanelComponent{
  selectedFilter = "";

  @Input("selected") selectedCategory: string;
  @Output() exportFilters = new EventEmitter<string[]>();
  @Output() exportSearch = new EventEmitter<string>();







  searchText: string = "";

  filtrationData = this.dta.filtrationData;

  activeFilters = Object.keys(this.filtrationData);

  // When user clicks out of dropdown, close dropdown
  @HostListener('document:mousedown', ['$event'])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.selectedFilter = "";
    }
  }



  // When the input (selected category like stem) changes, update tags list
  ngOnChanges(changes: SimpleChanges): void {
    this.filtrationData["Tags"] = this.dta.getTags(this.selectedCategory);
    this.reset();
  }

  getKeys(){
    return Object.keys(this.filtrationData)
  }

  changeFilters(index: number, typeIndex: number){
    this.activeFilters[typeIndex] = this.filtrationData[this.getKeys()[typeIndex]][index];
    this.exportFilters.emit(this.activeFilters);
    this.selectedFilter = "";
  }

  onSearchChange(){
    this.exportSearch.emit(this.searchText.toLowerCase());
  }

  reset() {
    this.activeFilters = Object.keys(this.filtrationData); 
    this.searchText = "";
    this.exportSearch.emit(this.searchText.toLowerCase());
    this.exportFilters.emit(this.activeFilters);
  }



  constructor(private elementRef: ElementRef, private dta: DataService){}

}
