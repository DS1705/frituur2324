import { Pipe, PipeTransform } from '@angular/core';
import {MenuItem} from "./models/menu-item";

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  private menu:MenuItem[]=[];
  transform(value: MenuItem[], filter: string): MenuItem[] {
    this.menu=value.filter(
      item=>{
        if(item.name.includes(filter)){
          return item;
        } else {
          return null
        }
      });
    console.log(this.menu);
    return this.menu;
  }

}
