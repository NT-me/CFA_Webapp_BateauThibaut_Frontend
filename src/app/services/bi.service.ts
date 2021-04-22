import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BiService {

  requestOptions
  apiAllHistory

  constructor(public http: HttpClient) {
    this.requestOptions = new Headers({
      'accept':'application/json'
    });
    this.apiAllHistory = "http://185.157.246.156/bi/info/history/all";
}

  getInfoAllHistory(){
    return this.http.get(this.apiAllHistory, this.requestOptions);
}

  getInfosFiltered(request){
    return this.http.get(this.apiAllHistory+request, this.requestOptions);
  }

  getInfoHistoryByDate(dateDebut,dateFin){
    return this.http.get(this.apiAllHistory+"?startInterval="+dateDebut+"&endInterval="+dateFin,this.requestOptions);
  }

  getInfoHistoryByType(transactionType){
    return this.http.get(this.apiAllHistory+"?type="+transactionType,this.requestOptions);
  }

  getInfoHistoryByCategory(category){
    return this.http.get(this.apiAllHistory+"?category="+category,this.requestOptions);
  }
}
