import { Subscription } from 'rxjs';
import { ProductService } from './../product.service';
import {Product} from '../models/Product';
import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product?:any;
  productSubscription?: Subscription;
  constructor(
      private activatedRoute: ActivatedRoute,
      private ProductService:ProductService,
      private router:Router,
      private data:SharedDataService
    ) {

  }

  ngOnInit(): void {
    var id:any;
    this.activatedRoute.url.subscribe(data=>{
      id = data.pop()?.path
    })
    this.productSubscription = this.data.currentProducts.subscribe((products:any) =>{
      this.product = products.filter((data:any)=>{
        return data.id == id
      })
      this.product = this.product[0]
      console.log(this.product?.title);
      //console.log('products=>',this.products);
    })



  }
  ngOnDestroy() {
    if(this.productSubscription)
    this.productSubscription.unsubscribe();
  }

}
/**
 *
 * if(this.router.getCurrentNavigation()?.extras.state?.product){
      var state =  this.router.getCurrentNavigation()?.extras.state;
      this.product = state?.product
      console.log('hoba',this.product);

    }else{
      this.activatedRoute.params.subscribe((params: Params) => {
        this.ProductService.getProductById(params.id).subscribe((data:any)=>{
          this.product = data;
        })
      });
    }
 */
