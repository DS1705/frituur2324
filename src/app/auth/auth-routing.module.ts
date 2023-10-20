import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";

const authRoutes:Routes=[
  {path:'register',component:RegisterComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  declarations: [

  ],
  imports: [
    RouterModule.forChild(authRoutes)
  ],
  exports:[
    RouterModule
  ],
})
export class AuthRoutingModule { }
