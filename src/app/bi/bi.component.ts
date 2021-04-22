import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BiService } from '../services/bi.service';

@Component({
  selector: 'app-bi',
  templateUrl: './bi.component.html',
  styleUrls: ['./bi.component.css']
})
export class BiComponent implements OnInit {

  allHistory: any;
  transactions: any;
  total: any;
  headers: any;
  dateFin: any;
  dateDebut: any;
  category : any;
  type : any;
  filters = new FormGroup({
    category: new FormControl(''),
    type: new FormControl(''),
    dateDebut : new FormControl(null, [
      Validators.required
  ]),
    dateFin : new FormControl(null, [
      Validators.required
  ])
 });
  


  constructor(public biService : BiService, private fb: FormBuilder) {
      this.allHistory = [];
      this.transactions =[];
      this.headers = ["Date","Nom","Quantité","Type transaction","Gain","Perte"]
  }

  ngOnInit(): void {
    this.biService.getInfoAllHistory().subscribe(data => {
      this.allHistory = data;
      this.transactions = data["transactions"];
    },
    (err) => {
      alert('failed');
    });
  }

  convertTimeStamp(timeStamp): String {
    var date = new Date(timeStamp*1000);
    return (date.getDate())+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  }

  checkTypeC(timeStamp): String {
    if(timeStamp.type == 'A'){
      return timeStamp.totalPrice
    }
    else 
      return '0';
  }

  checkTypeD(timeStamp): String {
    if(timeStamp.type == 'RPV'){
      return timeStamp.totalPrice
    }
    else 
      return '0';
  }

  convertToTimeStamp(date): number {
    console.log(Date.parse(date)/1000);
    return (Date.parse(date)/1000);
  }

  submitForm() {
    if(this.filters.value)
    this.biService.getInfosFiltered
    console.log(this.filters.value)
  }
}