import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'admin-features',
  templateUrl: './admin-features.component.html',
  styleUrls: ['./admin-features.component.css']
})
export class AdminFeaturesComponent {
  userList: any;
  userListKeys: any;

  unloaded = false;
  rolesList = ['User', 'Volunteer', 'Editor', 'Admin'];
  selectedUser = -1;

  openAdminSort = false;
  currentRoleSort = -1;
  searchText = "";

  user = this.dta.getUser();
  confirmation = false;
  tempIndex = -1;

  currentAdminInput = 0;
  isActive = this.dta.isActive;

  ngOnInit(): void {

    if(this.dta.getUser().role >= 3){
      this.unloaded = true;
      this.http.get("https://helivox-2-default-rtdb.firebaseio.com/Users.json/?auth=" + this.user.token).subscribe(resData => {
        this.unloaded = false;
        this.userListKeys = Object.keys(resData);
        this.userList = resData;
      }, err => {
        console.log(err);
        this.unloaded = false;
      })
    }
  }
  checkConfirmation(conf: boolean){
    if(conf){
      this.deleteUser(this.tempIndex);
    }
    this.tempIndex = -1;
    this.confirmation = false;
  }

  routeDeletion(index: number){
    this.tempIndex = index;
    this.confirmation = true;
  }

  deleteUser(index: number){
    this.dta.deleteData(this.userList[this.userListKeys[index]].token, "Users");
    this.userListKeys.splice(index, 1);
    delete this.userList[this.userListKeys[index]];
  }

  checkIfValid(uid: string){
    if(this.searchText !== "" && !this.userList[uid].email.includes(this.searchText)){
      return false;
    }
    if(this.currentRoleSort !== -1 && +this.userList[uid].role !== this.currentRoleSort){
      return false;
    }
    return true;
  }

  changeRole(index: number, role: number){
    this.selectedUser = -1;
    this.userList[this.userListKeys[index]].role = role;
    this.dta.patchData({
      role: ""+role
    }, 'Users/' + this.userList[this.userListKeys[index]].token);
  }




  constructor(private dta: DataService, private http: HttpClient){}

}
