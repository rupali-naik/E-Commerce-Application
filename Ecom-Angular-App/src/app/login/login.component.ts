import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';

import { tap } from 'rxjs/operators';
import { UserAuthService } from '../_services/user-auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService:UserService, private userAuthService:UserAuthService, private router: Router){

  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  login(loginForm: NgForm)
{
  //console.log("form is submitted")
  this.userService.login(loginForm.value).subscribe(
    (response:any)=>{
      //console.log(response);
      this.userAuthService.setRoles(response.user.role);
      this.userAuthService.setToken(response.jwtToken);
      const role=response.user.role[0].roleName
      if(role==='Admin')
      {
        this.router.navigate(['/admin'])
      }
      else
      this.router.navigate(['/user'])
    },
    (error)=>
    {
      console.log(error);
    }
  )
  // this.userService.login(loginForm.value).pipe(
  //   tap({
  //     next: response => {
  //       // Handle the response here
  //       console.log('Login successful:', response);
  //     },
  //     error: error => {
  //       // Handle error here 
  //       console.log('Login failed:', error);
  //     }
  //   })
  // ).subscribe();
 
}


registerUser(){
  this.router.navigate(['/register']);
}


}
