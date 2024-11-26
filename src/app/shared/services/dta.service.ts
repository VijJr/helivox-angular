import { Injectable, EventEmitter, OnInit } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';
import { User } from '../templates/user';

// Retrieve data from firebase database

// import { initializeApp } from "firebase/app";
// import { collection, getDocs, getFirestore } from "firebase/firestore";

// firebaseConfig = {
//     apiKey: "AIzaSyDXcpYQ9XHpJSRyhhqJgRx4Mc99eh_MeLE",
//     authDomain: "helivox-2.firebaseapp.com",
//     databaseURL: "https://helivox-2-default-rtdb.firebaseio.com",
//     projectId: "helivox-2",
//     storageBucket: "helivox-2.appspot.com",
//     messagingSenderId: "582156179729",
//     appId: "1:582156179729:web:f8bdbbdc06d3e92f94d4b0",
//     measurementId: "G-NWGYBGTEWH"
//   };
  
//   // Initialize Firebase
//    app = initializeApp(this.firebaseConfig);
//    db = getFirestore(this.app);

// tempReroute(){
        
//     let ref = collection(this.db, 'Courses');
//     getDocs(ref).then((d) => {
//         let f = [];
//         d.docs.forEach(element => {
//             f.push({...element.data()})
//         });
//         console.log(f)
//         this.http.put('https://helivox-2-default-rtdb.firebaseio.com/Courses.json?auth=' + this.user.token, f).subscribe(() => {});
//     })
// }


@Injectable({providedIn: 'root'})
export class DataService{



    init(){
        this.getData('About').subscribe((res) => {
            this.aboutUs = res;
        })

        return this.getData('Admin').toPromise().then((data: {
            catalogs: string[],
            carouselImages: string[],
            schools: any,
            tags: any
        }) => {
            this.catalogs = data.catalogs;
            this.carouselImages = data.carouselImages;
            this.schools = data.schools;
            this.tags = data.tags;
            this.isActive = true;

            for(let i = 0; i < this.catalogs.length; i++){
                this.catalogs[i] = this.catalogs[i].replace("_", " ")
            }

            this.defaultTags = Object.keys(this.filtrationData);
            this.types = Object.keys(this.tags);
        }).catch(()=>{
            this.catalogs = ["Courses", "Clubs"];
            this.schools = {
                "Michigan": ["Troy High School", "International Academy High School", "Cranbrook High School"],
                "Georgia": ["John's Creek High School"]
            };
            this.tags = {
                "STEM": ["Science", "Med", "Math", "CS", "Technology", "Standardized Testing"],
                "SPORTS": ["Boys", "Girls", "Winter", "Spring", "Fall", "Dance", "Swim", "Personal Fitness", "Self Defense"],
                "ARTS": ["Art", "Lit", "Pub. Speaking", "Lang/Culture", "Drama", "Music", "Film"],
                "MISC": ["Business", "Volunteering", "Religion", "Social Studies", "Life Skills", "Trade-Specific", "Trivia"]
            }

            this.carouselImages = ['https://raw.githubusercontent.com/Firingsniper/Helivox-stuff/main/Seminar%20Highlights%20opp%20slide.png', 'https://raw.githubusercontent.com/Firingsniper/Helivox-stuff/main/Corrected%20Prof%20Network%20Carousel.png'];
            this.isActive = false;
        })

    }


    user = new User("", "", "", new Date(), -1, "", "", "", 0);
    editMode = false;
    isActive = false;
    // Alert auxilary variables

    alertText = '';
    alertIsOpen = false;
    alertColor = ''

    aboutUs = null;


    // Catalogs Page
    catalogs = ["Courses", "Clubs"];
    schools = {
        "Michigan": ["Troy High School", "International Academy High School", "Cranbrook High School"],
        "Georgia": ["John's Creek High School"]
    };
    tags = {
        "STEM": ["Science", "Med", "Math", "CS", "Technology", "Standardized Testing"],
        "SPORTS": ["Boys", "Girls", "Winter", "Spring", "Fall", "Dance", "Swim", "Personal Fitness", "Self Defense"],
        "ARTS": ["Art", "Lit", "Pub. Speaking", "Lang/Culture", "Drama", "Music", "Film"],
        "MISC": ["Business", "Volunteering", "Religion", "Social Studies", "Life Skills", "Trade-Specific", "Trivia"]
    }

    // Referenced by default tags
    filtrationData = {
        "Hours": ["0", "1-5", "6-10", "10+"],
        "Cost": ["$0", "$1-20", "$20-50", "$50+"],
        "Tags": this.getTags("STEM"),
        "Rating": ['Superior', 'Outstanding']
      }
    
    defaultTags = Object.keys(this.filtrationData);
    types = Object.keys(this.tags);

    userRatingOptions = ['Unacceptable', 'Subpar', 'Standard', 'Superior', 'Outstanding'];

    checkIfUserResubmitRating = [];

    volQuests = [];

    // Front page

    statVal = ['83', '75', '69', '21', '95' ];
    statText = ['of teens identify school as a major stress factor - 2017 APA Stress Survey', 
    "of high school graduates do not feel adequately prepared to make college and career decisions - YouScience 'Post Graduation Readiness Report'",
    'of teens say getting into a good college is a major stress factor - 2017 APA Stress Survey', 
    'was the percentage increase in college applications between the 2019-2020 and the 2021-2022 school year - Department of Education, NCES College Enrollment Rates',
    'of Americans support US High School Students having more academic opportunities and choices - State of the Skills Gap: Perceptions of the role high school plays in preparing students for success in career - 2023 Edge Research and K12 Inc',
    ];

    carouselImages = ['https://raw.githubusercontent.com/Firingsniper/Helivox-stuff/main/Seminar%20Highlights%20opp%20slide.png', 'https://raw.githubusercontent.com/Firingsniper/Helivox-stuff/main/Corrected%20Prof%20Network%20Carousel.png'];

    // Getters for all variables
    
    get editorMode(){
        return this.editMode;
    }

    getAbout(){
        return this.aboutUs;
    }

    setAbout(e: any){
        this.aboutUs = e;
    }

    setVolQuests(e: any){
        if(e !== null && e !== undefined){
            this.volQuests = e;
            localStorage.setItem('volData', JSON.stringify(this.volQuests));

        }
    }

    getVolQuests(){
        if(this.volQuests === null){
            return [];
        }
        if(this.volQuests.length === 0){
            return []
        }
        return this.volQuests.slice();
    }

    setEditMode(editMode: boolean){
        this.editMode = editMode;
    }

    setUser(user: User){
        this.user = user;
        localStorage.setItem('userData', JSON.stringify(this.user));

    }

    getUser(){
        return this.user;
    }

    getAlertText(){
        return this.alertText;
    }

    setAlertData(text: string, status: boolean, color: string){
        this.alertText = text;
        this.alertColor = color;
        this.alertIsOpen = status;
        setTimeout(() => {
            this.alertText = "";
            this.alertColor = color;
            this.alertIsOpen = false;
        }, 2000)
    }

    getAlertStatus(){
        return this.alertIsOpen;
    }

    getAlertColor(){
        return this.alertColor;
    }



    getCarousel(){
        return this.carouselImages.slice();
    }

    setCarousel(carouselImages: any){
        this.carouselImages = carouselImages;
    }

    addCarousel(img: string){
        this.carouselImages.push(img);

        // send to backend
    }

    getUserRatingOptions(){
        return this.userRatingOptions.slice();
    }

    addUserRatingLog(index: number){
        this.checkIfUserResubmitRating.push(index);
    }
    
    checkIfResubmit(index: number){
        return this.checkIfUserResubmitRating.includes(index);
    }

    getStatVal(){
        return this.statVal.slice();
    }

    getStatText(){
        return this.statText.slice();
    }

    getCatalogs(){
        return this.catalogs.slice();
    }
    setCatalogs(catalogs: any){
        this.catalogs = catalogs;
    }
    getStates(){
        return Object.keys(this.schools)
    }

    getSchools(state: any){
        return this.schools[state];

    }
    getAllSchools(){
        return this.schools;
    }
    setAllSchools(schools: any){
        this.schools = schools;
    }   
    getTags(desc: string) {
        return this.tags[desc]
    }

    getAllTags(){
        return this.tags;
    }

    setAllTags(tags: any){
        this.tags = tags;
    }

    getDefaultTags(){
        return this.defaultTags.slice();
    }

    getTypes() {
        return this.types.slice()
    }

    // Http Request Methods



    postData(newDta: any, fileName: String){
        
        this.http.put('https://helivox-2-default-rtdb.firebaseio.com/' + fileName + '.json?auth=' + this.user.token, JSON.stringify(newDta)).subscribe(() => {});
        

        // this.http.put('https://helivox-2-default-rtdb.firebaseio.com/' + fileName + '.json', JSON.stringify(newDta)).subscribe(() => {});

    }

    getData(filename: String){
        return this.http.get('https://helivox-2-default-rtdb.firebaseio.com/' + filename + '.json');
    }

    patchData(newDta: any, fileName: String){
            this.http.patch('https://helivox-2-default-rtdb.firebaseio.com/' + fileName + '.json?auth=' + this.user.token, JSON.stringify(newDta)).subscribe(() => {});
    }

    deleteData(name: string, filename: string){
            this.http.delete('https://helivox-2-default-rtdb.firebaseio.com/' + filename + '/' + name + '.json?auth=' + this.user.token).subscribe(() => {})
    }
    deleteFile(filename: string){
        this.http.delete('https://helivox-2-default-rtdb.firebaseio.com/' + filename + '/' + '.json?auth=' + this.user.token).subscribe(() => {})
    }



 
    constructor(private http: HttpClient){}


}