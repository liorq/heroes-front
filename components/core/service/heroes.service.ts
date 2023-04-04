import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { hero } from '../../data/app.interfaces';
import {messages} from '../../../app.messages';
@Injectable({
  providedIn: 'root',
})

export class HeroesService {

  currentHeroesData=new BehaviorSubject<hero[]>([]);

  isAddedHeroPossible(addedHero: hero,HeroesData:hero[]){

    const isHeroExists = HeroesData.some(hero => hero.name === addedHero.name);
    Swal.fire(isHeroExists?messages.heroExistsMessage:messages.heroAdded);
     return !isHeroExists
  }


  getHeroPicture(hero: hero) {
    const obj: any = {};
    obj[hero.name] = true;
    return obj;
  }



  IsPossibleToTrainTheHero(currentHero: hero){
    const date = this.getCurrentDate()
    const IsntPossibleToTrain=currentHero.amountOfTimeHeroTrained >= 5 &&currentHero.lastTimeHeroTrained == date
    Swal.fire(!IsntPossibleToTrain?messages.heroTrained:messages.maximumTrained);
    return !IsntPossibleToTrain
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
