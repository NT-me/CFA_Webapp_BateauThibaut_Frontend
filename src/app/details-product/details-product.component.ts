import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-details-product',
  templateUrl: './details-product.component.html',
  styleUrls: ['./details-product.component.css']
})
export class DetailsProductComponent implements OnInit {

  products: any;

  constructor(public productsService : ProductsService) {
    this.products = [];
   }

  
  ngOnInit() {
    this.productsService.getJSON().subscribe(data => {
      this.products = data;
      console.log(data);
    },
    (err) => {
      alert('failed');
    });
  }

}
