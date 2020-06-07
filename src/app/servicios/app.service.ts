import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) 
  {}

  sendToken(token){
    return this.http.post<any>("/token_validate", {recaptcha: token})
  }
}
