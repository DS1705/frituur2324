import { Component, OnInit } from '@angular/core';
import {HttpService} from "../http.service";
import {Order} from "../models/order";
import {MenuItem} from "../models/menu-item";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent implements OnInit {
  private value: MenuItem | undefined;

  constructor(public httpService: HttpService, private authService:AuthService) {
  }

  ngOnInit(): void {
    this.httpService.getOrders(this.authService.currentUser);
    this.httpService.getItems();
    console.log(this.authService.currentUser);
  }

  getItemById(order: Order): MenuItem {
    let index = this.httpService.menu.findIndex((item: MenuItem) => {
      return order.menuitemID === item.id;
    });
    return this.httpService.menu[index];
  }

  up(order: Order) {
    order.amount++;
    this.updateOrder(order);
  }

  update(order:Order){
    this.updateOrder(order);
  }

  down(order: Order) {
    order.amount--;
    this.updateOrder(order);
  }

  updateOrder(order: Order) {
    console.log(order);
    this.httpService.updateOrder(order).subscribe(
      (response) => {
        console.log('order updated:', response);
      },
      (error) => console.log('error: ', error)
    );

  }

  getOrdersPrice(): number {
    let price = 0;
    this.httpService.orders.forEach((order) => {
      price = price + (this.getItemById(order).price * order.amount);
    });
    return price
  }

  getOrdersAmount(): number {
    let amount = 0;
    this.httpService.orders.forEach((order) => {
      amount = amount + order.amount;
    });
    return amount;
  }

  newOrder() {
    if(this.authService.currentUser){
      this.authService.currentUser.orderID=this.authService.currentUser.orderID+1;
      this.httpService.updateUser(this.authService.currentUser);
    }

  }

}
