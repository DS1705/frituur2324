import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ItemPageComponent} from "./item-page/item-page.component";
import {AddItemComponent} from "./item-page/add-item/add-item.component";
import {EditItemComponent} from "./item-page/edit-item/edit-item.component";



const adminRoutes:Routes=[
  {path:'item',component:ItemPageComponent,children:[
      {path:'edit/:id',component:EditItemComponent},
      {path:'add',component:AddItemComponent},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(adminRoutes)
  ]
})
export class AdminRoutingModule { }
