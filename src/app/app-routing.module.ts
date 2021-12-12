import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { AllProductComponent } from './components/all-product/all-product.component';
import { ProductComponent } from './components/product/product.component';

import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'',redirectTo:"products",pathMatch:"full"},
  {path:"products",component:AllProductComponent},
  {path:"product/:id", component:ProductComponent},
  {path:"product/Edit/:id", component:AddEditProductComponent},
  {path:"add",component:AddEditProductComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
