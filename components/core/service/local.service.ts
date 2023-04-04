import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalService {

  isUserLogged() {
      const token = localStorage.getItem('token');
      return token !== null && token !== undefined&&token!="";
    }



  setToken() {
    return localStorage.setItem('token' ,"");
  }

  initialDataBaseToDefault() {
    if (localStorage.getItem('token') === undefined)
    this.setToken()
  }
}
