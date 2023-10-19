import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {MenuItem} from "../models/menu-item";
import {CurrencyPipe} from "@angular/common";
import {ActivatedRoute, Params} from "@angular/router";
import {Order} from "../models/order";
import {MessageService} from "../message.service";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu-page.component.html',
  styleUrls: ['./menu-page.component.css']
})
export class MenuPageComponent implements OnInit {

  categoryID: string="";

  constructor(private authService:AuthService,private route:ActivatedRoute ,public httpService:HttpService,public currencyPipe:CurrencyPipe,private messageService:MessageService) { }

  ngOnInit(): void {
    this.httpService.getCategories();
    this.httpService.getItems();
    this.route.paramMap.subscribe(
      (params:Params)=>{
        this.categoryID=params['get']('id');
      }
    )
  }
  up(item:MenuItem){
    return item.amount+1;
  }

  down(item:MenuItem){
    return item.amount-1;
  }

  checkItemInOrders(item:MenuItem){
    var check=false;
    console.log("amount orders:"+this.httpService.orders.length);
    for(var i = 0; i<this.httpService.orders.length; i++){
      if(item.id===this.httpService.orders[i].menuitemID){
        check=true;
      }
    }
    return check;
  }

  addcart(item:MenuItem) {

    if (item.amount <= 0) {
      this.messageService.sendMessage("het aantal kan niet lager zijn dan 0")
    } else {
      console.log("start adding order");
      if (this.checkItemInOrders(item)) {
        this.httpService.updateOrder(this.addAmountToOrder(this.getOrderByItem(item), item)).subscribe();
      } else {
        const order=new Order(this.authService.currentUser?.orderID||0, item.id,this.authService.currentUser?.id||"" ,item.amount);
        console.log(order);
        this.httpService.addOrder(order).subscribe(
          (response) => {
            console.log('order added: ', response);
            this.httpService.menu[this.getIndexByItemId(item.id)].amount = 0;
          },
          (error) => {console.log('error: ', error);}
        );
      }
    }
  }

  addall(){
    this.httpService.menu.map((item)=>this.addcart(item));
  }

  getOrderByItem(item:MenuItem):Order{
    return this.httpService.orders.find(order=>order.menuitemID==item.id)||new Order(0,"","",0);
  }
  addAmountToOrder(order:Order,item:MenuItem):Order{
    order.amount=order.amount+item.amount;
    return order;
  }
  getIndexByItemId(id:string):number{
    return this.httpService.menu.findIndex(item=>item.id===id);
  }
}
