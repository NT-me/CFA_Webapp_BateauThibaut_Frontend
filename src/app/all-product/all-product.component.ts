import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.css']
})
export class AllProductComponent implements OnInit {

  products: any;
  poissons: any;
  coquillages: any;
  crustaces: any;

  headers: any;
  categories: any
  constructor(public productsService : ProductsService, public router: Router) {
    this.products = [];
    this.poissons = [];
    this.coquillages = [];
    this.crustaces = [];

    this.headers = ["Nom", "Prix", "Prix en promotion", "Pourcentage de promotion", "Quantité en stock", "Commentaires"];
    this.categories = ["Poissons", "Coquillages", "Crustacés"]
  }

  ngOnInit(): void {
    this.productsService.getInfoAllProducts().subscribe(data => {
      this.products = data;
    },
    (err) => {
      alert('failed');
      this.router.navigate(['/home']);
    });
    this.productsService.getInfoAllPoissonsProducts().subscribe(data => {
      this.poissons = data;
    },
    (err) => {
      this.router.navigate(['/home']);
    });
    this.productsService.getInfoAllCoquillagesProducts().subscribe(data => {
      this.coquillages = data;
    },
    (err) => {
      this.router.navigate(['/home']);
    });
    this.productsService.getInfoAllCrustacesProducts().subscribe(data => {
      this.crustaces = data;
    },
    (err) => {
      this.router.navigate(['/home']);
    });
  }

}
