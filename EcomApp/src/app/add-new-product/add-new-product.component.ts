import { Component, OnInit } from '@angular/core';
import { Product } from '../_model/product.model';
import { NgForm } from '@angular/forms';
import { ProductService } from '../_services/product.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from "@angular/platform-browser";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.css']
})
export class AddNewProductComponent implements OnInit {

  isNewProduct=true;

  product:Product={
  productId:null,
  productName:"",
  productDescription:"",
  discountedPrice:0,
      actualPrice:0,
      productImages: [],
}

constructor(private productService:ProductService,private sanitizer: DomSanitizer,
  private activatedRoute: ActivatedRoute){}


ngOnInit():void{
this.product=this.activatedRoute.snapshot.data['product'];

if(this.product && this.product.productId)
{
  this.isNewProduct=false;
}
}


addProduct(productForm: NgForm) {
  const formData = this.prepareFormDataForProduct(this.product);
  this.productService.addProduct(formData).subscribe(
    (response: Product) => {
      productForm.reset(); // it will reset the form after saving
      this.product.productImages = [];
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
  );
}

prepareFormDataForProduct(product: Product): FormData {
  const uploadImageData = new FormData();
  uploadImageData.append(  // stores in key-value pairs, product is key ane blob is value
    "product",
    new Blob([JSON.stringify(product)], { type: "application/json" })
  );
//The Blob constructor is used to create a binary large object from a JSON string 
// representation of the Product object.

// The MIME type is set to application/json to indicate that the data is in JSON format.

// The Blob can then be used for tasks like uploading to a server or saving as a file.

  for (var i = 0; i < this.product.productImages.length; i++) {// for loop as input will have multipe images for same id
    uploadImageData.append(
      "imageFile",
      this.product.productImages[i].file,
      this.product.productImages[i].file.name
    );
  }
  return uploadImageData;
}


onFileSelected(event: any) {
  if (event.target.files) {
    const file = event.target.files[0];
    const fileHandle: FileHandle = {
      file: file,
      url: this.sanitizer.bypassSecurityTrustUrl(  //url: Creates a URL for the file using the createObjectURL method.
      //  This URL is then sanitized to ensure it's safe for use in the application.
        window.URL.createObjectURL(file)
        //window.URL.createObjectURL(file): Generates a temporary URL for the file.
        //this.sanitizer.bypassSecurityTrustUrl(...): Uses Angular's DomSanitizer to sanitize the URL. 
        // This ensures the URL is safe and prevents security risks like XSS attacks.
      ),
    };
    this.product.productImages.push(fileHandle);
  }
}

removeImage(i:number):any
{
   return this.product.productImages.splice(i,1);//splice is method in typescript which modifies array by adding,removing or replacing
   //here i is the position of index to be delete,  1 says that only one deletion should happen
}

fileDropped(fileHandle:FileHandle){
  this.product.productImages.push(fileHandle);
}
}
