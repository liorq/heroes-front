import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyDataService {
  private apiUrl = 'http://localhost:1012';
  private token:BehaviorSubject<string>=new BehaviorSubject('');
  private userName!:string;
  constructor(private http: HttpClient) { }

async signUp(userName: string, password: string) {
  const data = {
    username: userName,
    password: password,
    role: 'trainer'
  };

  try {
    const response:any = await this.http.post(`${this.apiUrl}/signUp`, data).toPromise();
    return response?.status === 200;
  } catch (error:any) {
    return error?.status === 200;
  }
}


  async signInHandler(userName: string, password: string): Promise<boolean> {

    const data = {
      username: userName,
      password: password,
      role: 'trainer'
    };
    this.userName = userName;

    try {
      const response = await this.http.post<any>(`${this.apiUrl}/login`, data).toPromise();

      this.token.next(response?.access_token);
      localStorage.setItem('token', response?.access_token);
      return true;
    } catch (error: any) {
      return false;
    }
  }

 async getAllUserHeroes() {

  const headers = this.headerInit()


  try {
    const response = await this.http.get(`${this.apiUrl}/users/${this.userName}/heroes`, { headers })?.toPromise();
    return response;
  } catch (error) {
    return false;
  }
}





 async addHero(nameOfHero: string) {
  const headers = this.headerInit()

  try {
    const response = await this.http.post(`${this.apiUrl}/users/${this.userName}/heroes/${nameOfHero}`, null, { headers }).toPromise();
    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
}


async trainHero(heroName: string) {

  const headers = this.headerInit()
  try{
    const response:any = await this.http.patch(`${this.apiUrl}/users/${this.userName}/heroes/${heroName}`, null,{headers})?.toPromise();
    console.log(response);
    return response?.status==200;;

  } catch (error:any) {
    console.log(error);
   return error?.status==200;
  }
}


headerInit (){
  return  new HttpHeaders({
    'Authorization': 'Bearer ' + this.token.getValue()
  });

}


}
