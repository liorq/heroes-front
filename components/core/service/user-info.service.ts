import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {


  isUserLogged = new BehaviorSubject<boolean>(false);

  getInvalidMessage(errors:any,property:string,error:keyof typeof errors,errorMessage:string){
    if (errors?.required) {
      return `You must enter your ${property}`;
    }
    if (errors?.[error]) {
      return errorMessage;
    }
    return
  }

}
