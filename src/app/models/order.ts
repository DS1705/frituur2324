export class Order {
  public id: string = "";
  public orderID: number = 0;
  public menuitemID: string = "";
  public amount: number = 0;

  constructor(orderID: number, menuitemID: string, amount: number) {
    this.orderID = orderID;
    this.menuitemID = menuitemID;
    this.amount = amount;
  }
}
