import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BiService {

  requestOptions
  apiAllHistory

  constructor(public http: HttpClient) {
    this.requestOptions = {headers: new HttpHeaders({
      'accept':'application/json',
      'Auth' : 'Bearer '+localStorage.getItem("authToken")
    })};
    this.apiAllHistory = "http://185.157.246.156/bi/info/history/all";
}

  getInfoAllHistory(){
    return this.http.get(this.apiAllHistory+"?revenue=true", this.requestOptions);
}

  getInfosFiltered(request){
    return this.http.get(request, this.requestOptions);
  }

  getInfoHistoryByDate(dateDebut,dateFin){
    return this.apiAllHistory+"?startInterval="+(Date.parse(dateDebut)/1000)+"&endInterval="+((Date.parse(dateFin)/1000)+(3600*22));
  }

  getInfoHistoryByType(transactionType){
    return "&type="+transactionType;
  }

  getInfoHistoryByCategory(category){
    return "&category="+category;
  }

  getInfoHistoryBySale(){
    return "&sale=true";
  }
}
