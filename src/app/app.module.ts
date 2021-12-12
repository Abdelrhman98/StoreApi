import { ratingColor } from './components/ratingColor.pipe';
import { toPercentage } from './components/percentage.pipe';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

import { AllProductComponent } from './components/all-product/all-product.component';
import { ProductComponent } from './components/product/product.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestProductComponent } from './components/test-product/test-product.component';




@NgModule({
  declarations: [
    AppComponent,
    AllProductComponent,
    ProductComponent,
    AddEditProductComponent,
    TestProductComponent,
    toPercentage,
    ratingColor
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule


  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
