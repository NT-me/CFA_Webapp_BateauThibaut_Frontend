import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ManageProductsService } from '../services/manage-products.service';
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
  headers: Array<String>;
  categories: Array<String>
  product: any;
  myId: any;
  regex: RegExp
  button: boolean

  constructor(public productsService: ProductsService, public manageProduct: ManageProductsService, public router: Router) {
    this.products = [];
    this.poissons = [];
    this.coquillages = [];
    this.crustaces = [];
    this.regex = new RegExp(/[0-9]?[0-9]?[0-9]/i);
    this.button = false;

    this.headers = ["Nom", "Prix", "Prix en promotion", "Pourcentage de promotion", "Quantité en stock", "Commentaires"];
    this.categories = ["Poissons", "Coquillages", "Crustacés"]

  }


  ngOnInit() {
    this.productsService.getInfoAllProducts().subscribe(data => {
      this.products = data;
    },
      (err) => {
        alert('failed');
        this.router.navigate(['/home']);
      }
    );

  }

  afficherAll() {
    this.product = undefined;
  }

  afficherOne(id) {
    this.productsService.getInfoProduct(id).subscribe(data => {
      this.product = data;
    })
  }

  redize(value) {
    let input = document.getElementById('input');
    if ((value != "" && !value.match(this.regex)) || parseInt(value) >= 101 || parseInt(value) < 0) {
      input.style.backgroundColor = 'red';
      this.button = true;
    } else {
      input.style.backgroundColor = 'white';
      this.button = false;
    }
  }

  changeDiscount(value, id) {
    let pushElement = [{
      "id": id,
      "discPer": value
    }]
    this.manageProduct.patchManageAll(pushElement).subscribe(
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
