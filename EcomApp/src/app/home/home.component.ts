import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs';
import { ImageProcessingService } from '../_services/image-processing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber:number=0;
  productDetails:Product[] = [];
  showLoadButton=false;


  constructor(private productService:ProductService, private imageProcessingService:ImageProcessingService, private router:Router){

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

  searchByKeyword(searchkeyword:any){
    //reinitialize pageNumber, productDetails
    this.pageNumber=0;
    this.productDetails=[];
    this.getAllProducts(searchkeyword);

  }

  //map converts one type of data to another type
  // here we are converting image bytes into a actual image file

  public getAllProducts(searchKey:string="")// optional parameter
{
    this.productService.getAllProducts(this.pageNumber,searchKey).pipe(
      map((x:Product[],i)=>x.map((product:Product)=>this.imageProcessingService.createImages(product)))
    )
    .subscribe(
      (resp:Product[])=>{
        console.log(resp);
        if(resp.length==8)
          this.showLoadButton=true;
        else
          this.showLoadButton=false;
        resp.forEach(p=> this.productDetails.push(p))// the old list of product will be there, then add on new products when load more is clicked.
        //initially 8 products will be shown in one page, when load more is clicked next 8 procducts will be displayed along with previous 8 products total 16 product in one page
        
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  loadMoreProduct(){
    this.pageNumber=this.pageNumber +1;
    this.getAllProducts();
  }


  showProductDetails(productId:any){
    this.router.navigate(['/productViewDetails',{productId:productId}])
  }


}
