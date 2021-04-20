import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManageProductsService {

  requestOptions
  apiManageAll

  constructor(public http: HttpClient) {
    this.requestOptions = new Headers({
      'accept':'application/json',
      'Content-Type': 'application/json'
    });
    this.apiManageAll = "http://185.157.246.156/products/";

}

  patchManageAll(json: any){
    return this.http.patch(this.apiManageAll, json, this.requestOptions);
}
}