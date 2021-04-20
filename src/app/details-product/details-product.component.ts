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
  poissons: any;
  coquillages: any;
  crustaces: any;

  headers: any;
  categories: any
  product: any;
  myId: any;

  constructor(public productsService : ProductsService) {
    this.products = [];
    this.poissons = [];
    this.coquillages = [];
    this.crustaces = [];

    this.headers = ["Nom", "Prix", "Prix en promotion", "Pourcentage de promotion", "Quantité en stock", "Commentaires"];
    this.categories = ["Poissons", "Coquillages", "Crustacés"]
   }

  
  ngOnInit() {
    this.productsService.getInfoAllProducts().subscribe(data => {
      this.products = data;
    },
    (err) => {
      alert('failed');
    });
    
  }
  
  afficherAll(){
    this.product = undefined;
  }

  afficherOne(id){
    this.productsService.getInfoProduct(id).subscribe(data => {
      this.product = data;
    },
    (err) => {
      alert('failed');
    });
  }
}
