import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root',
})
export class UserInfoService {


   isUserLogged = new BehaviorSubject<boolean>(false);
  _isUserLogged = this.isUserLogged.asObservable();
  
  updateSubjectIsUserLogged(status:boolean){
    this.isUserLogged.next(status);
  }

  getInvalidMessage(errors:any,property:string,error:keyof typeof errors,errorMessage:string){
    if (errors?.required) {
      return `You must enter your ${property}`;
    }
    if (errors?.[error]) {
      return errorMessage;
    }
    return
  }
  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = !passwordRegex.test(control.value);
    return isValidPassword ? { passwordInvalid: true } : null;
  }
  getEncryptedPassword(password:string){
    return CryptoJS.SHA256(password).toString();
  }
}
