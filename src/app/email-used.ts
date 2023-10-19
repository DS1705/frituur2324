import {HttpService} from "./http.service";
import {AbstractControl, AsyncValidatorFn} from "@angular/forms";
import {map} from "rxjs/operators";
import {User} from "./models/user";

export function EmailUsed(httpService:HttpService):AsyncValidatorFn {
  return (control:AbstractControl)=>{
    return httpService.getUsers().pipe(
      map((users:User[])=>{
        console.log(control.status);
        const result = users.find((user:User)=>user.email===control.value);
        if(result){
          return {'usedEmail':true};
        }else{
          return null;
        }
        }
      )
    )
  }
}
