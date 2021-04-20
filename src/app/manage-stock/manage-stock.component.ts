import { Component, OnInit } from '@angular/core';
import { ManageProductsService } from '../services/manage-products.service';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-manage-stock',
  templateUrl: './manage-stock.component.html',
  styleUrls: ['./manage-stock.component.css']
})
export class ManageStockComponent implements OnInit {

  products: any;
  poissons: any;
  coquillages: any;
  crustaces: any;
  
  ajoutStock: any;
  discount: any;

  headers: any;
  categories: any;

  constructor(public productsService : ProductsService, public manageProduct : ManageProductsService) { 
    this.products = [];
    this.poissons = [];
    this.coquillages = [];
    this.crustaces = [];
    this.ajoutStock = [];
    this.discount = [];

    this.headers = ["Nom", "Prix", "Prix en promotion", "Pourcentage de promotion", "Quantité en stock", "Commentaires","Ajouter Stock","Ajouter Promo"];
    this.categories = ["Poissons", "Coquillages", "Crustacés"]
  }

  ngOnInit(): void {
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

  sendManageStock(){
    console.log(this.discount)
    let json = [{
      "id": 1,
      "stock": {
        "quantity": 11,
        "price": 0,
        "type": "A"
      },
      "discPer": 15
    },]
    this.manageProduct.patchManageAll(json)
    .subscribe(
          (val) => {
              console.log("PATCH call successful value returned in body", 
                          val);
          },
          response => {
              console.log("PATCH call in error", response);
          },
          () => {
              console.log("The PATCH observable is now completed.");
          }); ;
  }
}