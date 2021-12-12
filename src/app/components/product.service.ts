import { Product } from './models/Product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://fakestoreapi.com/';
  private Products:Product[];

  constructor(private _http:HttpClient) {
    this.Products = []
  }

  updateState(products:Product[]){
    this.Products = [...products]
  }

  getState(){
    return this.Products;
  }

  getAllProducts(){
    return this._http.get(this.apiUrl+"products")
  }

  getProductById(id:number){
    return this._http.get(this.apiUrl+"products/"+id)
  }

  getAllCategories(){
    return this._http.get(this.apiUrl+"products/"+"categories")
  }

  addNewProduct(formData:any){
    return this._http.post(this.apiUrl+"products",formData)
  }

  updateProductById(id:number, data:Product){
    console.log(this.Products);
    return this._http.put(this.apiUrl+"products/"+id, data)
  }
}
