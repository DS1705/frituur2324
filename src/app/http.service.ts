import { Injectable } from '@angular/core';
import {Category} from "./models/category";
import {Observable} from "rxjs";
import {MenuItem} from "./models/menu-item";
import {Order} from "./models/order";
import {
  addDoc,
  collection,
  collectionData, deleteDoc,
  doc, docData,
  Firestore, orderBy,
  query,
  setDoc,
  updateDoc,
  where,
  CollectionReference,
  DocumentReference
} from "@angular/fire/firestore";
import {from} from "rxjs";
import {Admin} from "./models/admin";
import {User} from "./models/user";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  categories: Category[]=[];
  menu: MenuItem[]=[new MenuItem("grote friet",3.60,"3")];
  orders: Order[] = [];
  currentorder: number = 1;
  search: string="";
  admins!: Admin[];
  users!: User[];

  constructor(private db:Firestore) { }

  getCategories():void {
    collectionData<Category>(
      collection(this.db, 'categories') as CollectionReference<Category>,
      {idField: 'id'}
    ).subscribe(
      (response: Category[]) => {
        this.categories = response;
      }
    )
  }

  getItems(): void {
    collectionData<MenuItem>(
      query(
        collection(this.db, 'items') as CollectionReference<MenuItem>,
        orderBy("price")
      ),
      {idField: 'id'}
    ).subscribe(
      (response: MenuItem[]) => {
        this.menu = response;
        console.log(response);
      }
    )
  }

  updateOrder(order: Order) {
    const OrderDoc = doc(this.db, 'orders/' + order.id) as DocumentReference<Order>;
    return from(updateDoc(OrderDoc, order));
  }

  addOrder(order: Order) {
    const newID=doc(collection(this.db,'id')).id;
    const OrderCollection = collection(this.db, 'orders/'+newID);
    return from(addDoc(OrderCollection, order));
  }

  getOrders(): void {
    collectionData<Order>(
      query<Order>(
        collection(this.db, 'orders') as CollectionReference<Order>,
        where("orderID", "==", this.currentorder)
      ),
      {idField: 'id'}
    ).subscribe(
      (response: Order[]) => {
        this.orders = response;
      }
    )
  }

  deleteOrder(order: Order): void {
    from(deleteDoc(doc(this.db, 'orders/' + order.id))).subscribe(
      (response: any) => {
        console.log('deleted: ', response);
      })
  }

}
