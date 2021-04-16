import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  requestOptions
  apiAllProducts
  apiAllPoissons
  apiAllCoquillages
  apiAllCrustaces
  apiProduct

  constructor(public http: HttpClient) {
    this.requestOptions = new Headers({
      'accept':'application/json'
    });
    this.apiAllProducts = "http://185.157.246.156/products/info/all";
    this.apiAllPoissons = "http://185.157.246.156/products/info/all?category=POI";
    this.apiAllCoquillages = "http://185.157.246.156/products/info/all?category=COQ";
    this.apiAllCrustaces = "http://185.157.246.156/products/info/all?category=CRU";
    this.apiProduct = "http://185.157.246.156/products/info/";
}

  getInfoAllProducts(){
    return this.http.get(this.apiAllProducts, this.requestOptions);
}

  getInfoAllPoissonsProducts(){
  return this.http.get(this.apiAllPoissons, this.requestOptions);
}

  getInfoAllCoquillagesProducts(){
  return this.http.get(this.apiAllCoquillages, this.requestOptions);
}

  getInfoAllCrustacesProducts(){
  return this.http.get(this.apiAllCrustaces, this.requestOptions);
}

  getInfoProduct(id){
    return this.http.get(this.apiProduct + id, this.requestOptions);
}

}
