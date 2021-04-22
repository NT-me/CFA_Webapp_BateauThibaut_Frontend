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
  blockModification: boolean;

  modificationList: any

  regex: any;
  headers: any;
  categories: any;

  constructor(public productsService: ProductsService, public manageProduct: ManageProductsService) {
    this.products = [];
    this.poissons = [];
    this.coquillages = [];
    this.crustaces = [];
    this.modificationList = [];

    this.blockModification = false;

    this.headers = ["Nom", "Prix", "Prix en promotion", "Pourcentage de promotion", "Quantité en stock", "Commentaires", "Ajouter Stock", "Retrait Stock", "Prix de revente", "Ajouter Promo"];
    this.categories = ["Poissons", "Coquillages", "Crustacés"]
    this.regex = new RegExp(/[0-9]?[0-9]?[0-9]/i);
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

  sendManageStock() {
    if (!this.blockModification) {
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
      setTimeout(location.reload.bind(location), 150);
    }
  }

  ajoutStock(value, id) {
    var input = document.getElementById('AjoutStock' + id);
    if (value != "" && !value.match(this.regex)) {
      input.style.backgroundColor = 'red';
      return;
    }
    input.style.backgroundColor = 'white'
    this.modificationList.push({
      "id": id,
      "stock": {
        "quantity": value,
        "price": 0,
        "type": "A"
      }
    })
  }

  retireStock(price, stock, retrait, id) {
    var input = document.getElementById('RetireStock' + id);
    if(!retrait.match(this.regex)){
      input.style.backgroundColor = 'red';
      return;
    }
    input.style.backgroundColor = 'white';
    if (stock >= retrait) {
      if (price == 0) {
        this.modificationList.push({
          "id": id,
          "stock": {
            "quantity": retrait,
            "price": 0,
            "type": "RPI"
          }
        })
      }
      else {
        this.modificationList.push({
          "id": id,
          "stock": {
            "quantity": retrait,
            "price": price,
            "type": "RPV"
          }
        })
      }
    }
    else {
      input.style.backgroundColor = 'red';
      return;
    }
  }
  changeDiscount(value, id) {
    var input = document.getElementById('discount' + id);
    input.style.backgroundColor = 'white';
    if (value != "" && !value.match(this.regex)) {
      input.style.backgroundColor = 'red';
      return;
    } else {
      this.modificationList.push({
        "id": id,
        "discPer": value
      })
    }
    if(value == null){
      input.style.backgroundColor = 'white';
    }
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