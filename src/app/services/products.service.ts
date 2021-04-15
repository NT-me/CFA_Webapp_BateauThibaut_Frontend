import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  requestOptions
  apiAllProducts
  apiProduct

  constructor(public http: HttpClient) {
    this.requestOptions = new Headers({
      'accept':'application/json'
    });
    this.apiAllProducts = "http://185.157.246.156/products/info/all";
    this.apiProduct = "http://185.157.246.156/products/info/";
}

  getInfoAllProducts(){
    return this.http.get(this.apiAllProducts, this.requestOptions);
}

  getInfoProduct(id){
    return this.http.get(this.apiProduct + id, this.requestOptions);
}

}
