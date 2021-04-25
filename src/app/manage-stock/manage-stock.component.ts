import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  regex: RegExp;
  headers: Array<String>;
  categories: Array<String>;

  constructor(public productsService: ProductsService, public manageProduct: ManageProductsService, public router: Router) {
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
    if (value != "" && !value.match(this.regex) || parseInt(value) < 0) {
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
    let verifRetrait = (retrait != "" && !retrait.match(this.regex) || parseInt(retrait) < 0);
    let verifPrice = (price != "" && !price.match(this.regex) || parseInt(price) < 0);

    console.log("price = "+price)
    console.log("stock = "+stock)
    console.log("retrait = "+retrait)

    if(verifRetrait && verifPrice ){
      ret.style.backgroundColor = 'red';
      revente.style.backgroundColor = 'red';
      return;
    }
    if(verifRetrait && !verifPrice){
      ret.style.backgroundColor = 'red';
      revente.style.backgroundColor = 'red';
      return;
    }
    if (verifPrice && !verifRetrait) {
      ret.style.backgroundColor = 'red';
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
      revente.style.backgroundColor = 'red';
      return;
    }
  }

  changeDiscount(value, id) {
    var input = document.getElementById('discount' + id);
    input.style.backgroundColor = 'white';
    if ((value != "" && !value.match(this.regex)) || parseInt(value) >= 101 || parseInt(value) < 0) {
      input.style.backgroundColor = 'red';
      return;
    } else {
      this.modificationList.push({
        "id": id,
        "discPer": value
      })
    }
  }
}