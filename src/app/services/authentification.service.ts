import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
    requestOptions
    apiTokenReq

    constructor(public http: HttpClient) {
      this.requestOptions = new Headers({
        'accept':'application/json',
        'Content-Type': 'application/json'
      });
      this.apiTokenReq = "http://loutre-duveteuse.fr.nf/security/pswd/token";
  }

    retrieveToken(formdata: any){
      console.log(this.requestOptions);
      return this.http.post(this.apiTokenReq, formdata, this.requestOptions);
  }
}
