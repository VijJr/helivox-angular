import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';
import { ImageService } from 'src/app/shared/services/image.service';
import { User } from 'src/app/shared/templates/user';

@Component({
  selector: 'about-submission',
  templateUrl: './about-submission.component.html',
  styleUrls: ['./about-submission.component.css']
})
export class AboutSubmissionComponent implements OnInit{
  selectedFile = 'Choose File';
  currentImage: any;
  @ViewChild('imgInput') imgInput: ElementRef;

  dropdownData = ['Sector Head', 'Executive' ];

  openDropdown = false;

  selectedCategory = 'Sector Head'

  description = "";
  name = "";
  role = "";

  cachedImage = "";

  confirmationModal = false;

  user = this.dta.getUser();
  
  ngOnInit(): void {
    
    if(this.user.about !== null && this.user.about !== undefined){
      let about = this.dta.getAbout().Admin[this.user.about];

      this.description = about.description;
      this.name = about.name;
      this.role = about.role;
      this.selectedCategory = about.category;
      this.cachedImage = about.image;
      this.selectedFile = "Retrieved";
    }
  }


  submitAbout(){
    this.processFile(this.currentImage);
  }

  processFile(e: Event){
    if(this.cachedImage !== "" && this.currentImage === undefined){
      this.sendToDb(this.cachedImage);
      return
    }
    const input = e.target as HTMLInputElement;
    this.imgService.processFile(input.files[0]).subscribe((res: {data: {display_url: string}}) => {
      this.sendToDb(res.data.display_url);
    });
  }

  submitCategory(data: string){
    this.selectedCategory = data; 
    this.openDropdown = false;
  }

  sendToDb(url: any){
    const submission = {
      name: this.name,
      description: this.description,
      role: this.role,
      image: url,
      category: this.selectedCategory
    }
    let about = this.dta.getAbout();
    if(this.user.about === undefined || this.user.about === null){
      this.dta.patchData(submission, "About/Admin/" + about.Admin.length);
      this.dta.patchData({
        about: about.Admin.length,
        name: this.name
      }, "Users/" + this.user.uid);

      this.user.name = this.name;
      this.user.about = about.Admin.length;
      about.Admin.push(submission);

    }
    else {
      about.Admin[this.user.about] = submission;
      this.dta.patchData(submission, "About/Admin/" + this.user.about);
      this.dta.patchData({
        name: this.name
      }, "Users/" + this.user.uid);
      this.user.name = this.name;

    }
    this.dta.setAbout(about);
    this.dta.setAlertData('Success!', true, '#07E607');
  }

  checkConfirmation(conf: boolean){
    if(conf){
      this.submitAbout();
    }
    this.confirmationModal = false;

  }
  
  openModal(){
    if((this.currentImage !== undefined || this.cachedImage !== "") && this.description !== "" && this.role !== "" && this.name !== ""){
      this.confirmationModal = true;

    }
  }

  constructor(private dta: DataService, private imgService: ImageService){}
}
