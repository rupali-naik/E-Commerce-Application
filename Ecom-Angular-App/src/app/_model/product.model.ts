import {FileHandle} from "./file-handle.model";
export interface Product {
    
      productId:any,
     productName:string,
     productDescription:string,
      discountedPrice:number,
      actualPrice:number,
      productImages:FileHandle[];
}