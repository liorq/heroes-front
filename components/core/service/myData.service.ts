import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  private apiUrl = 'http://localhost:1012';
  private token:BehaviorSubject<string>=new BehaviorSubject("");
  constructor(private http: HttpClient) { }
///signUp

 async signUp(user: any){
  if (!user.email || !user.password) {
    console.error("Missing username or password");
    return;
  }
      const data = {
        username: user.email,
        password: user.password,
        role: 'trainer'
      };

      return await this.http.post(`${this.apiUrl}/signUp`, data).subscribe(
        response => {
          console.log(response);
          // Handle success response
        },
        error => {
          console.error(error);
          // Handle error response
        }
      );

  }

  ////signIn
  async signIn(userName: string, password: string) {

    const data = {
      username: userName,
      password: password,
      role: 'trainer'
    };
    return await this.http.post<any>(`${this.apiUrl}/login`, data).toPromise()
      .then(response => {
        console.log('Response:', response);
        this.token=response.access_token;
        console.log(this.token)
        // Handle successful response
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle error response
      });
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
