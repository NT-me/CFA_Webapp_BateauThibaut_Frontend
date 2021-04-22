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

  headers: any;
  categories: any;

  constructor(public productsService : ProductsService, public manageProduct : ManageProductsService) { 
    this.products = [];
    this.poissons = [];
    this.coquillages = [];
    this.crustaces = [];
    this.modificationList = [];

    this.blockModification = false;

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
    if(!this.blockModification){
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

  retireStock(price, stock, retrait, id){
    if(stock >= retrait) { 
      this.blockModification = false;  
      if (price == 0){
        this.modificationList.push({
          "id" : id,
          "stock" : {
            "quantity": retrait,
            "price": 0,
            "type": "RPI"
          }
        })
      }
      else {
        this.modificationList.push({
          "id" : id,
          "stock" : {
            "quantity": retrait,
            "price": price,
            "type": "RPV"
        }
      })
    }
  }
  else{
    var bt = document.getElementById('myElem');
      bt.style.backgroundColor;
      this.blockModification = true;
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