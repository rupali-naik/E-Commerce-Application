import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService:UserService,private router:Router){

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }


  register(registerForm:NgForm){
    this.userService.register(registerForm.value).subscribe(
      (response)=>{
        this.router.navigate(['/login']);
        
      },
      (error)=>{

      }
    );
  }
}
