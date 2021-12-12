import { Product } from './../models/Product';
import { SharedDataService } from './../shared-data.service';

import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  categories:string[];
  imagePreview: string;
  productForm: FormGroup;
  mode:string;

  editedId:string;
  editedProduct:Product;
  selectedCategory:string;
  productSubscription?: Subscription;
  categoriesSubscribtion?:Subscription;

  products:Product[];

  constructor(
    private ProductService:ProductService,
    private activatedRoute: ActivatedRoute,
    private data:SharedDataService,
    private router:Router) {
    this.categories = [];
    this.imagePreview = "";
    this.mode = '';
    this.products = []
    this.editedId = '';
    this.editedProduct = {id:0,title:"",price:0,description:"",category:"",image:"", rating:{rate:0,count:0}};
    this.selectedCategory = '';
    this.productForm = new FormGroup({
      title         : new FormControl(null, {validators:[Validators.required, Validators.minLength(3),Validators.maxLength(500)]}),
      price         : new FormControl(null, {validators:[Validators.required, Validators.minLength(3),Validators.maxLength(15)]}),
      category      : new FormControl(null, {validators:[Validators.required, Validators.minLength(3),Validators.maxLength(540)]}),
      description   : new FormControl(null, {validators:[Validators.required, Validators.minLength(3),Validators.maxLength(9000)]}),
      image         : new FormControl(null, {validators:[Validators.minLength(3)]})
    });
    this.getMode()
    if(this.mode == 'edit'){
      this.editedProduct = {id:0,title:"",price:0,description:"",category:"",image:"", rating:{rate:0,count:0}};
    }
  }

  getMode(){
    this.activatedRoute.url.subscribe(data=>{
      //console.log(data);
      let lastIndex = data.pop()?.toString()
      this.mode     =  (lastIndex=="add")?"add":"edit";
      if(lastIndex && this.mode == 'edit')
        this.editedId =  (this.mode=="edit")? lastIndex :"";
    })
    //console.log(this.router.getCurrentNavigation()?.extras.state);
    //console.log(this.mode);
  }

  ngOnInit(): void {
    this.productSubscription = this.data.currentProducts.subscribe((products:any) =>{
      this.products = products
      //console.log('products=>',this.products);
    })
    this.categoriesSubscribtion = this.data.currentCategories.subscribe((categories:any)=>{
      this.categories = categories
    })


    if(this.router.getCurrentNavigation()?.extras.state?.product){
      var state =  this.router.getCurrentNavigation()?.extras.state;
      //this.categories = state?.categories
      this.editedId = state?.product
    }else{
      this.getProductById(this.editedId)
      this.ProductService.getAllCategories()
      .subscribe((data:any)=>{
      this.categories = data
      //console.log(this.categories)
    })
    }

  }


  onImagePicked(event: Event) {
    //@ts-ignore
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({ image: file.name });
    console.log(this.productForm.get('image')?.value);
  }

  submitForm(){
    if(this.productForm.valid){
      if(this.mode != 'edit')
        this.ProductService.addNewProduct(this.productForm.value).subscribe((data:any)=>{
          Object.assign(data,{rating:{rate:0,count:0}},{image:"https://via.placeholder.com/250",id:this.products.length+1})
          this.products.push(data);
          this.data.changeProductState(this.products)
          console.log(data);
          this.router.navigate(['/products'])
        })
      else{
        this.products = this.products.filter(ele=>{
          return ele.id!= this.editedProduct.id
        })

        var edited = Object.assign(this.productForm.value,
          {rating:{
            rate:this.editedProduct.rating.rate,
            count:this.editedProduct.rating.count,
          }})
        this.products.push(edited);

        //console.log(edited);
        this.data.changeProductState(this.products)

        this.ProductService.updateProductById(this.editedProduct.id,this.productForm.value)
        this.router.navigate(['/products'])
      }
    }
  }

  getProductById(id:string){
    this.ProductService.getProductById(parseInt(id))
    .subscribe((data:any)=>{
      this.editedProduct = {
        id:data.id,
        title:data.title,
        price:data.price,
        description:data.description,
        category:data.category,
        image:data.image,
        rating:{
          rate:data.rating.rate,
          count:data.rating.count
        }
      };
        this.productForm.patchValue(this.editedProduct)
        this.editedId = data.id
        this.selectedCategory = data.category
      //console.log(this.editedProduct);
    }
    )
  }


  ngOnDestroy() {
    if(this.productSubscription)
    this.productSubscription.unsubscribe();
  if(this.categoriesSubscribtion)
    this.categoriesSubscribtion.unsubscribe();
  }
}
