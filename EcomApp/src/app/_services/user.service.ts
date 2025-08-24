import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  Path_to_Api="http://localhost:9090";
  requestHeader=new HttpHeaders({'No-Auth': 'True'});//for '/authenticate' function we dont need any authentication check, and this is excluded in backend also
  constructor(private http:HttpClient,private userAuthService:UserAuthService) { }

  public register(registerData:any){
    return this.http.post(this.Path_to_Api+'/registerNewUser',registerData)
  }

  public login(loginData:any){
    return this.http.post(this.Path_to_Api+'/authenticate',loginData,{headers:this.requestHeader} )
  }

  public forUser() {
    return this.http.get(this.Path_to_Api + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin(){
    return this.http.get(this.Path_to_Api+'/forAdmin',{responseType:'text'});
  }

  public roleMatch(allowedRoles :any):boolean
  {
    let isMatch=false;
    const userRole:any=this.userAuthService.getRoles();
    if(this.userAuthService.getRoles()){
    for(let i=0;i<this.userAuthService.getRoles().length;i++)
    {
      for(let j=0;j<allowedRoles.length;j++)
      {
        if(userRole[i].roleName===allowedRoles[j])
        {
          isMatch=true;
          return isMatch;
        }
      }
    }
   
  }
  return isMatch;
  }
}


