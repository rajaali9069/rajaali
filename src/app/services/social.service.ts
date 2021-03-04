import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
url;
  constructor(private http: HttpClient) { }
  Savesresponse(responce)
  {
    this.url =  'http://709004211872-26ubf9fh1sdokrt3i4l178d85s7fo8kl.apps.googleusercontent.com/';
    return this.http.post(this.url,responce);
  }
}
export class Socialusers {  
    provider: string;  
    id: string;  
    email: string;  
    name: string;  
    image: string;  
    token?: string;  
    idToken?: string;  
}