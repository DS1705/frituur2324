import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AdminRoutingModule} from "./admin-routing.module";
import { ItemPageComponent } from './item-page/item-page.component';
import { AddItemComponent } from './item-page/add-item/add-item.component';
import { EditItemComponent } from './item-page/edit-item/edit-item.component';
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [
    ItemPageComponent,
    AddItemComponent,
    EditItemComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ]
})
export class AdminModule { }
