import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DetailsProductComponent } from './details-product/details-product.component';
import { AllProductComponent } from './all-product/all-product.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component'


const routes: Routes = [
  { path: 'details', component:  DetailsProductComponent},
  { path: 'products', component: AllProductComponent},
  { path: 'manageStock', component: ManageStockComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
