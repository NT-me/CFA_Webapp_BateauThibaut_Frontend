import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DetailsProductComponent } from './details-product/details-product.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AllProductComponent } from './all-product/all-product.component';
import { ManageStockComponent } from './manage-stock/manage-stock.component';

@NgModule({
  declarations: [
    AppComponent,
    DetailsProductComponent,
    AllProductComponent,
    ManageStockComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule      
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
