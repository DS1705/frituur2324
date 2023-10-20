import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {HttpService} from "../../http.service";
import {Observable} from "rxjs";
import {User} from "../../models/user";
import {EmailUsed} from "../../email-used";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form!:FormGroup;
  validEmail=/^[a-z0-9]+@[a-z0-9]+\.[a-z0-9]+$/;

  constructor(private httpService:HttpService, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email':new FormControl("",[Validators.required,this.checkEmail.bind(this),],[EmailUsed(this.httpService)]),
      'password':new FormControl("",[Validators.required,Validators.minLength(6)]),
    });
  }

  get email(){
    return this.form.controls['email'] as FormControl;
  }
  get password(){
    return this.form.controls['password'] as FormControl;
  }

  onSubmit(){
    this.authService.register(this.email.value,this.password.value)
    .then(
      res=>{
        if(res=="success"){
          this.router.navigate(['/login'])
        }else{
          alert(res);
        }
      }
    )
  }
  checkEmail(control:FormControl):{[s:string]:boolean}|null{
    if(!this.validEmail.test(control.value)){
      return {'invalidEmail' : true};
    }
    return null;
  }
  usedEmail(control:FormControl){
  if(this.authService.isEmailUsed(control.value)){
    return {'usedEmail':true}
  }
  return null
  }

  onChange(){
    console.log(this.form)
  }

}
