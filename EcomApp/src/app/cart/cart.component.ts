import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  
  displayedColumns: string[] = ['Product Name', 'description', 'Product Discounted Price','Product Actual Price','Action'];
  cartDetails: any=[];

  constructor(private productService: ProductService,private router:Router){

  }

  ngOnInit(): void {
   // throw new Error('Method not implemented.');
   this.getCartDetails();
  }
  getCartDetails(){
    this.productService.getCartDetails().subscribe(
      (response)=>{
        console.log(response);
        this.cartDetails=response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

  checkout(){
    // this.productService.getProductDetails(false,0).subscribe(
    //   (resp)=>{
    //     console.log(resp);
    //   },
    //   (error)=>{
    //     console.log(error);
    //   }
    // )

    this.router.navigate(['/buyProduct',{
      isSingleProductCheckout: false,id:0
    }]);
  }

  delete(cartId:any)
  {
    this.productService.deleteCartItem(cartId).subscribe(
      (response)=>{
        console.log(response);
        this.getCartDetails();
      },
      (error)=>{
        console.log(error);
      }
    )
  }
}
