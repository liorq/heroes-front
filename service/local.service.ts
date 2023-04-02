import { Injectable } from '@angular/core';
import { hero } from '../app.interfaces';

@Injectable({
  providedIn: 'root',
})

export class LocalService {
  updateUserName(name: string) {
    this.UpdateStatusIsUserLogged(true);
    this.setCurrentUserName(name);
  }

  updateLocalUserHeroes(currentHeroData: any[]) {
    ///insert userHero hero between user dataBase password and mail (not currentUserHeroData)
    let UsersData:any=JSON.parse(this.getUsersData() || '[]');
    const index: any = this.getIndex();
    const userData: any[] = JSON.parse(this.getUsersData() || '[]');
    UsersData = [...userData[index].heroes];
    userData[index].heroes = currentHeroData;
    this.setUsersData([...userData]);

    return
  }

  getLocalUserHeroData() {
    ///when user logged
    const usersData:any=JSON.parse(this.getUsersData() || '[]');
    const userName:string|null=this.getCurrentUserName()
    const currentHeroesData = usersData.find(
      (user: any) => user.email == userName
    );
    const currentIndex: any = usersData.indexOf(currentHeroesData);
    this.setIndex(currentIndex);
    return [...currentHeroesData.heroes].sort((heroA:hero,heroB:hero)=>heroB.CurrentPower-heroA.CurrentPower)
  }

  deleteUserInfo() {
    ///when user log-out
    this.UpdateStatusIsUserLogged(false);
    this.setCurrentUserName('');
    this.setIndex('');
  }

  isUserLogged() {
    ///when page refrese
    const isUserLogged = this.getStatusIsUserLogged();
    const currentUserName=this.getCurrentUserName();
    if (isUserLogged  &&currentUserName){
      return  true
    }
    return  false
  }

  UpdateStatusIsUserLogged(status: boolean) {
    localStorage.setItem('isUserLogged', status ? 'true' : 'false');
  }

  getStatusIsUserLogged() {
    return localStorage.getItem('isUserLogged');
  }

  setIndex(currentIndex: any) {
    localStorage.setItem('index', currentIndex);
  }

  getIndex() {
    return localStorage.getItem('index');
  }

  setUsersData(newUsersData: any) {
    localStorage.setItem('usersData', JSON.stringify([...newUsersData]));
  }

  getUsersData() {
    return localStorage.getItem('usersData');
  }

  setCurrentUserName(name: string) {
    localStorage.setItem('currentUserName', name);
  }

  getCurrentUserName() {
    return localStorage.getItem('currentUserName');
  }

  initialDataBaseToDefault() {
    if (this.getUsersData() === undefined)
    this.setUsersData([]);

    if (this.getStatusIsUserLogged() === undefined)
      this.UpdateStatusIsUserLogged(false);

    if (this.getCurrentUserName() === undefined)
    this.setCurrentUserName('');

    if (this.getIndex() == undefined || this.getIndex() == '-1') {
      this.setIndex(0);
    }
  }
}
