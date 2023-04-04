import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { hero, user } from '../../data/app.interfaces';
import {messages} from '../../../app.messages';
@Injectable({
  providedIn: 'root',
})

export class HeroesService {
  usersData: any ;
  currentHeroesData=new BehaviorSubject<hero[]>([]);

  isAddedHeroPossible(addedHero: hero,HeroesData:hero[]){

    for (let hero of HeroesData) {
      if (hero.name == addedHero.name) {
        Swal.fire(messages.heroExistsMessage);
        return
      }
    }
    Swal.fire(messages.heroAdded);
    return true
  }
  getHeroPicture(hero: hero) {
    const obj: any = {};
    obj[hero.name] = true;
    return obj;
  }



  IsPossibleToTrainTheHero(currentHero: hero){
    const date = this.getCurrentDate()

    if (currentHero.amountOfTimeHeroTrained >= 5 &&currentHero.lastTimeHeroTrained == date) {
      Swal.fire(messages.maximumTrained);
      return false
    }
    Swal.fire(messages.heroTrained);

    return true
  }

  trainHero(currentHero: hero){

    const date = this.getCurrentDate()

    if (currentHero.firstDayHeroTrained == 0)
         currentHero.firstDayHeroTrained = date;

    if (currentHero.lastTimeHeroTrained != undefined)
         currentHero.lastTimeHeroTrained = date;

    if (currentHero.lastTimeHeroTrained != date) {
         currentHero.amountOfTimeHeroTrained = 0;
         currentHero.lastTimeHeroTrained = date;
    }

        currentHero.amountOfTimeHeroTrained++;
        currentHero.currentPower = Math.floor(
        currentHero.currentPower * (1 + Math.random() * 0.1));
  }

  clickBtnHandler(currentHero: hero) {

    if(!this.IsPossibleToTrainTheHero(currentHero))
      return false

    this.trainHero(currentHero)
      return true
  }
  getCurrentDate(){
    const dt = new Date();
    const year = dt.getFullYear().toString();
    const month = (dt.getMonth() + 1).toString().padStart(2, '0');
    const day = dt.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
