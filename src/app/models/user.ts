export class User {
  public id?: string = "";
  public orderID: number = 0;
  public email: string = "";

  constructor(id: string, orderID: number, email: string) {
    this.id=id;
    this.orderID = orderID;
    this.email = email;
  }
}
