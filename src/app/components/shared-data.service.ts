import { ProductService } from './product.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './Product';
@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private productSource = new BehaviorSubject<Product[]>([]);
  private categoriesSource = new BehaviorSubject<string[]>([]);

  currentProducts = this.productSource.asObservable();
  currentCategories = this.categoriesSource.asObservable();

  constructor(private ProductService:ProductService) {
    this.currentCategories.subscribe((data:any)=>{
      if(data.length==0)
        this.updateCategoriesFromApi()
    })

    this.currentProducts.subscribe((data:any)=>{
      if(data.length==0)
        this.updateProductStateFromApi()
    })
  }

  changeProductState(products:Product[]){
    this.productSource.next(products)
  }

  updateProductStateFromApi(){
    this.ProductService.getAllProducts().subscribe((data:any)=>{
      this.changeProductState(data);
    });
  }

  changeCategoriesState(categories:string[]){
    this.categoriesSource.next(categories)
  }

  updateCategoriesFromApi(){
    this.ProductService.getAllCategories().subscribe((data:any)=>{
      this.changeCategoriesState(data)
    })
  }

}
