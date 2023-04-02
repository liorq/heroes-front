import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {

  currentUserLogged = new Subject<string>();
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

  isValidUserInformation(userName: string, password: string, usersData: any[]) {
    for (let user of usersData) {
      if (userName == user.email && password == user.password) {
        console.log('succses to login');
        return { email: user.email, isValidInfo: true };
      }
    }
    return { isValidInfo: false };
  }

  isUserAvailable(newUser: any, usersData: any[]) {
    if (usersData.find((user: any) => user.email === newUser.email)) {
      console.log(' The name you choosed isnt available');
      return false;
    }
    return true;
  }
}
