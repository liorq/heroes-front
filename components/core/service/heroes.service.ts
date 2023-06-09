import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';
import { hero } from '../../data/app.interfaces';
import {messages} from '../../data/app.messages';
@Injectable({
  providedIn: 'root',
})

export class HeroesService {

  private currentHeroesData=new BehaviorSubject<hero[]>([]);
  private allHeroes=new BehaviorSubject<hero[]>([]);
  _currentHeroesData = this.currentHeroesData.asObservable();
  _allHeroes= this.allHeroes.asObservable();

  updateCurrentHeroesSubject(currentHeroesData:hero[]){
  this.currentHeroesData.next(currentHeroesData)
  }
  updateAllHeroesSubject(allHeroes:hero[]){
    this.allHeroes.next(allHeroes)
    }
  isAddedHeroPossible(addedHero: hero,HeroesData:hero[]){

    const isHeroExists = HeroesData.some(hero => hero.name === addedHero.name);
    Swal.fire(isHeroExists?messages.heroExistsMessage:messages.heroAdded);
     return !isHeroExists
  }


  getHeroPicture(hero: hero) {
    return {[hero.name]:true}
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
        const powerIncrease = (new Date().getMinutes() % 10 + 1) / 100;
        currentHero.currentPower = Math.floor(currentHero.currentPower * (1 + powerIncrease));


  }
trainHeroHandler(currentHero: hero) {

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
