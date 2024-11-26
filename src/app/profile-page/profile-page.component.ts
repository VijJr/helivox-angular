import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../shared/services/dta.service';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { ImageService } from '../shared/services/image.service';
import { User } from '../shared/templates/user';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})

export class ProfilePageComponent implements OnInit{

  @ViewChild('imgInput') imgInput: ElementRef;

  currentImage: any;

  unloaded = false;

  selectedFile = 'Choose File';
  
  user = this.dta.getUser();

  confirmationValue = "";


  ngOnInit(): void {
    if(this.dta.getUser().role < 0){
      this.router.navigateByUrl('');
    }

  }
  checkConfirmation(conf: boolean){
    if(conf){
      if(this.confirmationValue === "delete"){
        const user = this.dta.getUser();
        this.dta.deleteData(user.uid, "Users");
        this.auth.deleteUser(user.token);
      }
      if(this.confirmationValue === "logout"){
        this.auth.logout();
      }
      if(this.confirmationValue === "image"){
        this.processFile(this.currentImage);
      }
    }

    this.confirmationValue = "";

  }

  deleteSignedInUser(){
    this.confirmationValue = "delete";
  }

  logout(){
    this.confirmationValue = "logout";
  }
  
  processFile(e: Event){
    const input = e.target as HTMLInputElement;
    this.unloaded = true;
    this.imgService.processFile(input.files[0]).subscribe((res: {data: {display_url: string}}) => {
      this.dta.setAlertData('Upload Success!', true, '#07E607');
      this.imgInput.nativeElement.value = '';
      this.unloaded = false;
      this.dta.getUser().profile_picture = res.data.display_url;
      const userData = this.dta.getUser();
      localStorage.setItem("userData", JSON.stringify(new User(userData.email, userData.id, userData.token, new Date(userData.tokenExpirationDate), userData.role, userData.profile_picture, userData.name, userData.about, userData.hours)))
      this.dta.patchData({
        profile_picture: res.data.display_url
      }, "Users/" + this.dta.getUser().uid)
    });
  }

  checkImage(){
    this.confirmationValue = "image";
  }



  pfp(){
    if(this.dta.getUser().profile_picture !== undefined){
      return this.dta.getUser().profile_picture;
    }
    return '../../assets/anonymous.png';
  }

  constructor(private dta: DataService, private router: Router, private auth: AuthService, private imgService: ImageService, private http: HttpClient){}
}
