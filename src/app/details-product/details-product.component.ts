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
  oneProduct: any;
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
    this.productsService.getInfoAllPoissonsProducts().subscribe(data => {
      this.poissons = data;
    },
    (err) => {
      alert('failed');
    });
    this.productsService.getInfoAllCoquillagesProducts().subscribe(data => {
      this.coquillages = data;
    },
    (err) => {
      alert('failed');
    });
    this.productsService.getInfoAllCrustacesProducts().subscribe(data => {
      this.crustaces = data;
    },
    (err) => {
      alert('failed');
    });
  }
  
  afficherAll(){
    this.oneProduct = undefined;
  }

  afficherOne(id){
    this.productsService.getInfoProduct(id).subscribe(data => {
      this.oneProduct = data;
    },
    (err) => {
      alert('failed');
    });
  }
}
