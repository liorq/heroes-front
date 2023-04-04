import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class LocalService {




  isUserLogged() {
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
