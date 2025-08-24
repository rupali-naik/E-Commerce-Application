import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../_model/product.model';
import { OrderDetails } from '../_model/order-details.model';
import { MyOrderDetails } from '../_model/order.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  requestHeader=new HttpHeaders({'No-Auth': 'True'});
  
  constructor(private http:HttpClient) { }

   //public addProduct(product:Product)
  public addProduct(product: FormData)
  {
    return this.http.post<Product>("http://localhost:9090/addNewProduct",product);
  }

  public getAllProducts(pageNumber:any,searchKeyword:string="") // default value given bcoz search is not used always, its used only when user
  //  searches for product, by default len=0 so it will return all products this is implemented in api
  {
    return this.http.get<Product[]>("http://localhost:9090/getAllProducts?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getProductDetailsById(productId:any)
  {
    return this.http.get<Product>("http://localhost:9090/getProductDetailsById/"+productId);
  }

  public deleteProduct(productId:number)
  {
    return this.http.delete("http://localhost:9090/deleteProductDetails/"+productId);
  }

  public deleteCartItem(cartId:any)
  {
    return this.http.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public getProductDetails(isSingleProductCheckout:boolean,productId:any)
  {
    return this.http.get<Product[]>("http://localhost:9090/getProductDetails/"+isSingleProductCheckout+"/"+ productId);
  }

  public placeOrder(orderDetails:OrderDetails, isCartCheckout:string)
  {
    return this.http.post("http://localhost:9090/placeOrder/"+isCartCheckout, orderDetails);
  }

  public addToCart(productId:any)
  {
    return this.http.get("http://localhost:9090/addToCart/"+productId);
  }

  public getCartDetails()
  {
    return this.http.get("http://localhost:9090/getCartDetails");
  }

  public getMyOrders():Observable<MyOrderDetails[]>
  {
    return this.http.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }

  public getAllOrderDetailsForAdmin(status:string):Observable<MyOrderDetails[]>
  {
    return this.http.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/"+status);
  }

  public markAsDelivered(orderId:any)
  {
    return this.http.get("http://localhost:9090/markOrderAsDelivered/"+orderId);
  }

}
