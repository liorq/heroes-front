import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  private apiUrl = 'http://localhost:1012';

  constructor(private http: HttpClient) { }
///signUp

  signUp(user: any){
    return this.http.post<any>(`${this.apiUrl}/users`, user);

  }
  ////signIn
  signIn(user: any){
    return this.http.get<any>(`${this.apiUrl}/items`, user);

  }
 ////getAllHero
 getAllHero() {
    return this.http.get<any[]>(`${this.apiUrl}/items`);
  }
 ////getHero

 getHero(id: number) {
    return this.http.get<any>(`${this.apiUrl}/items/${id}`);
  }
 ////addHero

 addHero(item: any) {
    return this.http.post<any>(`${this.apiUrl}/items`, item);
  }
 ////trainHero

 trainHero(id: number, item: any) {
    return this.http.put<any>(`${this.apiUrl}/items/${id}`, item);
  }
 ////deleteItem

  deleteItem(id: number) {
    return this.http.delete<any>(`${this.apiUrl}/items/${id}`);
  }

}
