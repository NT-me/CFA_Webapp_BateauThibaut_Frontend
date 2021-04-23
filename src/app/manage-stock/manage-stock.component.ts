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
    this.regex = new RegExp(/[^-]\d[^-]/i);
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
    var revente = document.getElementById('Revente' + id);
    var ret = document.getElementById('RetireStock' + id);
    let verifRetrait = (retrait != "" && !retrait.match(this.regex));
    let verifPrice = (price != "" && !price.match(this.regex));

    console.log("price = "+price)
    console.log("stock = "+stock)
    console.log("retrait = "+retrait)

    if(verifRetrait && verifPrice){
      ret.style.backgroundColor = 'red';
      revente.style.backgroundColor = 'red';
      return;
    }
    if(verifRetrait && !verifPrice){
      ret.style.backgroundColor = 'red';
      return
    }
    if (verifPrice && !verifRetrait) {
      revente.style.backgroundColor = 'red';
      return;
    }
    ret.style.backgroundColor = 'white';
    revente.style.backgroundColor = 'white';
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
      ret.style.backgroundColor = 'red';
      return;
    }
  }

  changeDiscount(value, id) {
    var input = document.getElementById('discount' + id);
    input.style.backgroundColor = 'white';
    if ((value != "" && !value.match(this.regex)) || parseInt(value) >= 101) {
      input.style.backgroundColor = 'red';
      return;
    } else {
      this.modificationList.push({
        "id": id,
        "discPer": value
      })
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