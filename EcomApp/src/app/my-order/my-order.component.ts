import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { MyOrderDetails } from '../_model/order.model';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent  implements OnInit {

  displayedColumns=['Name','Address','Contact No.','Amount','Status'];
  myOrderDetails:MyOrderDetails[]=[]; 
  constructor(private productService:ProductService)
  {

  }
  ngOnInit(): void {
    this.getOrderDetails();
  }

  getOrderDetails()
  {
    this.productService.getMyOrders().subscribe(
      (response:MyOrderDetails[])=>{
        this.myOrderDetails=response;
      },
      (error)=>{
        console.log(error);
      }
    )
  }

}
