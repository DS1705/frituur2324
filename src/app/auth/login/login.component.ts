import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!:FormGroup;
  invalidLogin!:boolean;

  constructor(private auth:AuthService,private router:Router) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      'email':new FormControl("",Validators.required),
      'password':new FormControl("",[Validators.required,Validators.minLength(6)]),
    });
    this.invalidLogin=false;
  }

  onSubmit() {
    console.log(this.form.value);
    const email =this.form.value.email;
    const password =this.form.value.password;
    this.auth.login(email,password)
      .then(
        (response)=>{
          if(!response){
            this.invalidLogin=true;
          }
          else{
            this.invalidLogin=false;
            this.router.navigate([''])
          }
        }
      )
  }
}
