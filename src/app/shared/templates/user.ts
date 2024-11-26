import { HttpClient } from "@angular/common/http";




export class User{

    constructor(
        public email: string, 
        public id: string, 
        private _token: string, 
        private _tokenExpirationDate: Date,
        private _role: number,
        private _profile_picture: string,
        private _name: string,
        private _about: any, 
        private _hours: number
    ){}

    // Setters

    set profile_picture(pfp: string) {
        this._profile_picture = pfp;
        const cur = JSON.parse(localStorage.getItem('userData'));
        cur._profile_picture = pfp;
        localStorage.setItem('userData', JSON.stringify(cur));
    }

    set name(name: string){
        this._name = name;
        const cur = JSON.parse(localStorage.getItem('userData'));
        cur._name = name;
        localStorage.setItem('userData', JSON.stringify(cur));
    }

    set about(about: any){
        this._about = about;
        const cur = JSON.parse(localStorage.getItem('userData'));
        cur._about = about;
        localStorage.setItem('userData', JSON.stringify(cur));
    }

    set hours(hours: number){
        this._hours = hours;
        const cur = JSON.parse(localStorage.getItem('userData'));
        cur._hours = hours;
        localStorage.setItem('userData', JSON.stringify(cur));
    }



    // Getters


    get token() {
        if(!this._tokenExpirationDate || (new Date() > this._tokenExpirationDate)){
            return null;
        }
        return this._token;
    }

    get profile_picture() {
        if(!this._tokenExpirationDate || (new Date() > this._tokenExpirationDate)){
            return '../../assets/anonymous.png';
        }
        return this._profile_picture;
        
    }

    get uid(){
        if(!this._tokenExpirationDate || (new Date() > this._tokenExpirationDate)){
            return null;
        }
        return this.id;
    }

    get role(){
        return this._role;
    }

    get tokenExpirationDate(){
        return this._tokenExpirationDate;
    }

    get name(){
        return this._name;
    }

    get about(){
        return this._about;
    }

    get hours() {
        return this._hours;
    }

    getUsername(){
        return this.email.split('@')[0];
    }
    
 }