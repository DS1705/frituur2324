import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {BrowserModule} from "@angular/platform-browser";

const authRoutes:Routes=[
  {path:'register',component:RegisterComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(authRoutes)
  ]
})
export class AuthRoutingModule { }
