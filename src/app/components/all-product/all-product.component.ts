import { Router } from '@angular/router';

import { SharedDataService } from './../shared-data.service';
import { ProductService } from '../product.service';
import { Component, OnInit } from '@angular/core';
import {Product} from '../models/Product';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-all-product',
  templateUrl: './all-product.component.html',
  styleUrls: ['./all-product.component.scss']
})
export class AllProductComponent implements OnInit {
  products:Product[];
  AllProducts:Product[];
  categories:string[];
  selectedCategory:string;

  productSubscription?: Subscription;
  categoriesSubscribtion?:Subscription;

  constructor(
    private productService:ProductService,
    private data:SharedDataService,
    private router:Router) {
    this.products = []
    this.categories = []
    this.AllProducts = []
    this.selectedCategory = ''
  }


  ngOnInit(): void {
    this.productSubscription = this.data.currentProducts.subscribe((products:any) =>{
      this.products = products
      this.AllProducts = [...products]
    })
    this.categoriesSubscribtion = this.data.currentCategories.subscribe((categories:any)=>{
      this.categories = categories
    })
    //this.getAllCategories()
    //console.log(this.products);

  }

  deleteProductById(id:number){
    this.products = this.products.filter(element=>{
      return element.id!=id
    })
    this.AllProducts = this.AllProducts.filter(element=>{
      return element.id!=id
    })
    this.data.changeProductState(this.AllProducts)
  }



  sortByCategory(category:string){
    this.products = this.AllProducts;
    if(category!="All")
    this.products = this.products.filter((ele:Product)=>{
      return ele.category == category
    })
  }

  sortDataByOrder(order:string){
    this.products.sort((a,b)=>{
      return (order=='ASC')?a.price-b.price:b.price-a.price
    })
  }

  sortDataByRating(){
    this.products.sort((a,b)=>{
      return b.rating.rate-a.rating.rate
    })
  }

  goToEdit(id:number){
    var wantToEdit:any = this.AllProducts.filter((ele:any)=>{
      return ele.id == id
    })
    this.router.navigate(['/product/Edit/',id],{state:{product:wantToEdit}})
    //this.router
  }

  goToDetails(id:number){
    var wantToShow:any = this.AllProducts.filter((ele:any)=>{
      return ele.id == id
    })
    //console.log(wantToShow);
    this.router.navigate(['/product/',id],{state:{product:wantToShow}})
  }

  ngOnDestroy() {
    if(this.productSubscription)
      this.productSubscription.unsubscribe();
    if(this.categoriesSubscribtion)
      this.categoriesSubscribtion.unsubscribe();
  }
}

