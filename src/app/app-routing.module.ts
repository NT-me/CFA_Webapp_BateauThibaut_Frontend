import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsProductComponent } from './details-product/details-product.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component'
import { HomeComponent } from './home/home.component';
import { BiComponent } from './bi/bi.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'details', component:  DetailsProductComponent},
  { path: 'products', component: AllProductComponent},
  { path: 'manage', component: ManageStockComponent},
  { path: 'bi', component: BiComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
