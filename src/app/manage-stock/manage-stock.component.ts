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
  

  modificationList: any

  headers: any;
  categories: any;

  constructor(public productsService : ProductsService, public manageProduct : ManageProductsService) { 
    this.products = [];
    this.poissons = [];
    this.coquillages = [];
    this.crustaces = [];
    this.modificationList = [];

    this.headers = ["Nom", "Prix", "Prix en promotion", "Pourcentage de promotion", "Quantité en stock", "Commentaires","Ajouter Stock","Retrait Stock","Prix de revente","Ajouter Promo"];
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
    this.manageProduct.patchManageAll(this.modificationList)
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
      });
  }

  ajoutStock(value, id){
    console.log("ajout stock : " + value + "id : " + id)
      this.modificationList.push({
        "id" : id,
        "stock" : {
          "quantity": value,
          "price": 0,
          "type": "A"
      }
  })
}

  retireStock(price, stock, id){
    console.log("retirer stock : " + stock + "prix stock : " + price + "id : " + id)
    if (price == 0){
      this.modificationList.push({
        "id" : id,
        "stock" : {
          "quantity": stock,
          "price": 0,
          "type": "RPI"
        }
      })
    }
    else {
      this.modificationList.push({
        "id" : id,
        "stock" : {
          "quantity": stock,
          "price": price,
          "type": "RPV"
      }
    })
  }
}
  changeDiscount(value, id){
      this.modificationList.push({
        "id" : id,
        "discPer" : value
      })
  }

  /*manageInput(v){
    var bt = document.getElementById('btSubmit');
        if (v >= 0) {
            bt.disabled = false;
        }
        else {
            bt.disabled = true;
        }
      }
      */
}