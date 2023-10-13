import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string|null=null;

  constructor(private httpService:HttpService,private router:Router,private auth: Auth) {
    if(localStorage.getItem('token')){
      this.token=localStorage.getItem('token');
    }
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
          return this.auth.currentUser?.getIdToken()
            .then(
              (token:string)=>{
                this.token=token;
                localStorage.setItem('token',token);
                return true
              }
            )
        }
      )
      .catch(
        error =>{
          console.log(error);
          return false;
        }
      )
  }

  register(email:string, password:string):Promise<string>{
    return createUserWithEmailAndPassword(this.auth,email, password)
      .catch(error=>{
        console.log(error);
        return error;
      })
      .then(()=>{
          return 'success';
        }
      )
  }

  logout(){
    this.auth.signOut();
    this.token= null;
    localStorage.removeItem('token');
    this.router.navigate([''])
  }

  isLoggedIn():boolean{
    return this.token != null;
  }

  isAdmin():boolean{
    return this.uidInAdmins(this.getUid());
  }
  uidInAdmins(uid:string|null){
    if(uid==null){
      return false
    }
    let res=false;
    this.httpService.admins.find(
      (a)=>{
        if(a.id===uid){
          res=true;
        }
      }
    );
    return res;
  }

  getUid(){
    if(this.auth.currentUser){
      return this.auth.currentUser.uid;
    }else{
      return null;
    }
  }

  isEmailUsed(){

  }

}
