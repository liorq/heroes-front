import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalService {


  deleteUserInfo() {
    localStorage.setItem('token', "");
  }

  isUserLogged() {
    return localStorage.getItem('token');
  }



  getStatusIsUserLogged() {
    return localStorage.getItem('token');
  }



  getToken() {
    return localStorage.getItem('token');
  }
  setToken() {
    return localStorage.setItem('token' ,"");

  }
  initialDataBaseToDefault() {
    if (this.getToken() === undefined)
    this.setToken();
  }
}
