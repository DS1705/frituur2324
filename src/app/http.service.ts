import {Injectable} from '@angular/core';
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

  categories: Category[] = [];
  menu: MenuItem[] = [new MenuItem("grote friet", 3.60, "3")];
  orders: Order[] = [];
  currentorder: number = 1;
  search: string = "";
  admins!: Admin[];
  users!: User[];

  constructor(private db: Firestore) {
    this.getUsers()
  }

  getCategories(): void {
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
    const newID = doc(collection(this.db, 'id')).id;
    console.log(newID);
    //order.id=newID;
    console.log(order);
    const OrderRef = doc(this.db, '/orders/' + newID);
    return from(setDoc(OrderRef, order));
  }

  getOrders(user: User | null): void {
    if (user == null) {
      return;
    }
    collectionData<Order>(
      query<Order>(
        collection(this.db, 'orders') as CollectionReference<Order>,
        where("orderID", "==", user.orderID),where("userID","==",user.id)
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

  getUser(id: string | undefined): Observable<User> {
    return docData<User>(doc(this.db, '/users/' + id) as DocumentReference<User>,{idField:"id"});
  }
  getUsers() {
    return collectionData<User>(
        collection(this.db, 'items') as CollectionReference<User>,
        {idField: 'id'}
    )
  }
  updateUser(user:User){
    const UserDoc = doc(this.db, '/users/' + user.id) as DocumentReference<User>;
    return from(updateDoc(UserDoc, user));
  }
  setUser(user:User){
    const userDoc=doc(this.db,'/users/'+user.id) as DocumentReference<User>;
    delete user.id;
    console.log(userDoc,user);
    return setDoc(userDoc,user);
  }

}
