import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({providedIn: 'root'})
export class ImageService {

    apiKey = '436f0fdda34c8fbca44ce7d71f9ef684';

    processFile(file: File){
        const formData = new FormData();

        formData.append('image', file);

        return this.http.post('https://api.imgbb.com/1/upload', formData, {params: {key: this.apiKey } })
    }
    
    constructor(private http: HttpClient){}

}