import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { hero } from '../../data/app.interfaces';


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {


   isUserLogged = new BehaviorSubject<boolean>(false);
  _isUserLogged = this.isUserLogged.asObservable();
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
