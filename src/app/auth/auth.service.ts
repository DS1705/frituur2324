import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "@angular/fire/auth";
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token:string|null=null;
  currentUser:User|null=null;

  constructor(private httpService:HttpService,private router:Router,private auth: Auth) {
    if(localStorage.getItem('token')){
      this.token=localStorage.getItem('token');
    }
    if(localStorage.getItem('currentUser')){
      this.currentUser=JSON.parse(localStorage.getItem('currentUser')||'{}');
    }
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(() => {
          return this.auth.currentUser?.getIdToken()
            .then(
              (token:string)=>{
                this.token=token;
                this.httpService.getUser(this.auth.currentUser?.uid).subscribe(
                  (data)=>{
                    this.currentUser=data;
                    localStorage.setItem('currentUser',JSON.stringify(data))
                  }
                );
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
      .then((user)=>{
        this.httpService.setUser(new User(user.user.uid,0,user.user.email)).then(()=>{
          return 'success';
        });
        return '';
        }
      )
  }

  logout(){
    this.auth.signOut();
    this.token = null;
    this.currentUser=null;
    localStorage.clear();
    this.router.navigate(['']);
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

  isEmailUsed(email:string){
    const result = this.httpService.users.find((user)=>user.email==email)
    if(result){
      return true;
    }
    return false;
  }

}
