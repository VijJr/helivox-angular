import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { tap } from 'rxjs/operators'
import { User } from "../templates/user";
import { BehaviorSubject, Subject } from "rxjs";
import { Data, Router } from "@angular/router";
import { DropdownAlertComponent } from "src/app/dropdown-alert/dropdown-alert.component";
import { DataService } from "./dta.service";

interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string
}

interface UserResponseData{
    users: [{
        emailVerified: boolean
    }]
}

@Injectable({providedIn: 'root'})
export class AuthService {

    private tokenExpirationTimer: any;




    verification(idToken: string){
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            requestType: 'VERIFY_EMAIL',
            idToken: idToken

        })
    }

    autoLogin(){
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string,
            http: HttpClient,
            _role: number,
            _profile_picture: string,
            _name: string,
            _about: any,
            _hours: number
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){return;}  
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate), userData._role, userData._profile_picture, userData._name, userData._about, userData._hours);
        if(localStorage.getItem('volData') !== null || localStorage.getItem('volData') !== undefined){
            this.dta.setVolQuests(JSON.parse(localStorage.getItem('volData')));
        }
        if(loadedUser.token){
            this.dta.setUser(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
            this.autoLogout(expirationDuration);
        }
    }


    login(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            email: email,
            password: password,
            returnSecureToken: true

        }).pipe(tap(resData => {
            this.http.get('https://helivox-2-default-rtdb.firebaseio.com/Users/' + resData.localId + '.json?auth='+ resData.idToken).subscribe((userD:{role: string, profile_picture: string, name: string, about: any, hours: number}) => {
                const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
                const user = new User(resData.email, resData.localId, resData.idToken, expirationDate, +userD.role, userD.profile_picture, userD.name, userD.about, userD.hours);
                this.dta.setUser(user);
                this.autoLogout(+resData.expiresIn * 1000);
                localStorage.setItem('userData', JSON.stringify(user));

                if(+userD.role === 1){
                    this.http.get('https://helivox-2-default-rtdb.firebaseio.com/Volunteer_Submissions/'+ resData.localId + '.json?auth='+ resData.idToken).subscribe((volD: any[]) => {
                        if(volD !== undefined && volD !== null){
                            this.dta.setVolQuests(volD);
                            localStorage.setItem('volData', JSON.stringify(volD));
                        }
                    })
                }
            });
        }))
    }
    signup(email: string, password: string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            email: email,
            password: password,
            returnSecureToken: true

        }).pipe(tap(resData => {
            const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
            const user = new User(resData.email, resData.localId, resData.idToken, expirationDate, 0, undefined, "", "", 0);
            this.dta.setUser(user);
            this.autoLogout(+resData.expiresIn * 1000);
            localStorage.setItem('userData', JSON.stringify(user));
            
        }))
    }

    // parseUserInfo(resData: AuthResponseData){
    //     this.http.get('https://helivox-2-default-rtdb.firebaseio.com/Users/' + resData.localId + '.json?auth='+ resData.idToken).subscribe((userD:{role: string, profile_picture: string}) => {
    //         const expirationDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
    //         const user = new User(resData.email, resData.localId, resData.idToken, expirationDate, +userD.role, userD.profile_picture);
    //         this.dta.setUser(user);
    //         this.autoLogout(+resData.expiresIn * 1000);
    //         localStorage.setItem('userData', JSON.stringify(user));
    //         console.log(user)
    //     });

    // }

    logout(){
        const newUser = new User("", "", "", new Date(), -1, "", "", "", 0);
        this.dta.setUser(newUser);
        this.router.navigate(['/login']);
        localStorage.removeItem('userData');
        localStorage.removeItem('volData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.dta.setAlertData("Logged Out", true, '#e65045');
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration)
    }

    fetchUserData(idToken: string){

        return this.http.post<UserResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            idToken: idToken
        })
    }

    deleteUser(idToken: string){
        this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            idToken: idToken
        }).subscribe(() => {});
    }

    sendPasswordResetCode(username: string){
        return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE', 
        {
            requestType: 'PASSWORD_RESET',
            email: username
        })
    }
    


    constructor(private http: HttpClient, private router: Router, private dta: DataService){}
    
}