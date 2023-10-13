export class User {
  public id: string = "";
  public orderID: number = 0;
  public email: string = "";

  constructor(orderID: number, email: string) {
    this.orderID = orderID;
    this.email = email
  }
}
