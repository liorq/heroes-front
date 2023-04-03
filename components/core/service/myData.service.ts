import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  private apiUrl = 'http://localhost:1012';
  private token!:string;
  constructor(private http: HttpClient) { }
///signUp

 async signUp(user: any){

      const data = {
        username: user.username,
        password: user.password,
        role: 'trainer'
      };

      return this.http.post('/api/users/create', data).subscribe(
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
    const formData = new FormData();
    formData.append('username', userName);
    formData.append('password', password);

    return this.http.post<any>(`${this.apiUrl}/login`, formData).toPromise()
      .then(response => {
        console.log('Response:', response);
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
