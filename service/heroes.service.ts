import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { hero, user } from '../app.interfaces';
import {messages} from '../app.messages';
@Injectable({
  providedIn: 'root',
})

export class HeroesService {
  usersData: any ;
  currentHeroesData=new Subject<hero[]>();

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

  IsPossibleToTrainTheHero(currentHero: hero,date:string){
    if (currentHero.HerosTrainingTimes >= 5 &&currentHero.lastTimeTrained == date) {
      Swal.fire(messages.maximumTrained);
      return false
    }
    return true
  }

  trainHero(currentHero: hero,date:string){
    if (currentHero.firstTrainedDay == 0)
         currentHero.firstTrainedDay = date;

    if (currentHero.lastTimeTrained != undefined)
         currentHero.lastTimeTrained = date;

    if (currentHero.lastTimeTrained != date) {
         currentHero.HerosTrainingTimes = 0;
         currentHero.lastTimeTrained = date;
    }
        currentHero.HerosTrainingTimes++;
        currentHero.CurrentPower = Math.floor(
        currentHero.CurrentPower * (1 + Math.random() * 0.1));
  }

  clickBtnHandler(currentHero: hero) {
    const dt = new Date();
    const date =dt.getFullYear() + '/' + (dt.getMonth() + 1) + '/' + dt.getDate();

    if(!this.IsPossibleToTrainTheHero(currentHero,date))
      return false

    this.trainHero(currentHero,date)
      return true
  }

}
