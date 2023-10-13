import { Pipe, PipeTransform } from '@angular/core';
import {MenuItem} from "./models/menu-item";

@Pipe({
  name: 'itembycategory'
})
export class ItembycategoryPipe implements PipeTransform {
  private menu: MenuItem[]=[];

  transform(value: MenuItem[], category: string): MenuItem[] {
    this.menu =value.filter(item=>{
      if(item.idCategory===category){
        return item;
      }else{
        return null;
      }
    });
    console.log(this.menu);
    return this.menu;
  }

}
