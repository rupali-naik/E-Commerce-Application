import { Component, OnInit } from '@angular/core';
import { OrderDetails } from '../_model/order-details.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-buy-product',
  templateUrl: './buy-product.component.html',
  styleUrls: ['./buy-product.component.css']
})
export class BuyProductComponent implements OnInit{

  isSingleProductCheckout:string='';

  productDetails: Product[]=[];
  orderDetails:OrderDetails={
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    orderProductQuantityList: []
  }
  constructor(private activatedRoute: ActivatedRoute,private productService:ProductService,private router:Router){

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
     this.productDetails=this.activatedRoute.snapshot.data['productDetails'];
     this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout") ?? '';     
     this.productDetails.forEach(x=>this.orderDetails.orderProductQuantityList.push({productId:x.productId,quantity:1}));

    }

  placeOrder(orderForm:NgForm){
    this.productService.placeOrder(this.orderDetails,this.isSingleProductCheckout).subscribe(
      (resp)=>{
        console.log(resp);
        orderForm.reset();
        this.router.navigate(["/orderConfirm"]);
      },
      (error)=>{
        console.log(error);
      }
    );
  }

  getQuantityForProduct(productId:any){
    const filteredProduct =this.orderDetails.orderProductQuantityList.filter((productQuantity)=> productQuantity.productId===productId);
    return filteredProduct[0].quantity
  }

  getCalculatedTotal(productId:any,discountedPrice:any){
    return this.getQuantityForProduct(productId)*discountedPrice;
  }

  onQuantityChanged(qty:any,productId:any)
  {
    return this.orderDetails.orderProductQuantityList.filter((orderProduct)=>orderProduct.productId===productId)[0].quantity=qty;
  }

  getCalculatedGrandTotal(){
    let grandTotal=0;
    this.orderDetails.orderProductQuantityList.forEach((productQuantity)=>{
      const price= this.productDetails.filter(product=>product.productId===productQuantity.productId)[0].discountedPrice;
       grandTotal=grandTotal+ price*productQuantity.quantity
    });
   return grandTotal;
  }
}
