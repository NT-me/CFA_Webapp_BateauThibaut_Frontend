import { Component, OnInit } from '@angular/core';
import { BiService } from '../services/bi.service';

@Component({
  selector: 'app-bi',
  templateUrl: './bi.component.html',
  styleUrls: ['./bi.component.css']
})
export class BiComponent implements OnInit {

  allHistory: any;
  total: any

  constructor(public biService : BiService) {
      this.allHistory = [];
  }

  ngOnInit(): void {
    this.biService.getInfoAllHistory().subscribe(data => {
      this.allHistory = data;
    },
    (err) => {
      alert('failed');
    });
  }

}
