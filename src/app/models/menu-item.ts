export class MenuItem {
  public id:string="";
  public name:string="kleine friet";
  public price:number=0.00;
  public idCategory:string="";
  public amount:number=0;
  constructor(name:string,price:number,idCategory:string) {
    this.name=name;
    this.price=price;
    this.idCategory=idCategory;
  }
}
