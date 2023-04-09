import { Component, OnInit } from '@angular/core';
import { hero } from '../../data/app.interfaces';
import { HeroesService } from 'src/app/components/core/service/heroes.service';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
import { MyDataService } from '../../core/service/myData.service';

@Component({
  selector: 'app-myHeroes',
  templateUrl: './myHeroes.component.html',
  styleUrls: [
    './myHeroes.component.css',
    '../allHeroes/allHeroes.component.css',
  ],
})
export class MyHeroesComponent implements OnInit {
  constructor(
    public heroesService: HeroesService,
    public localService: LocalService,
    public userInfoService: UserInfoService,
    private myDataService: MyDataService
  ) {}

  currentHeroesData: any = [];

  ngOnInit() {
    this.localService.initialDataBaseToDefault();

    this.heroesService._currentHeroesData.subscribe((currentUserHeroesData: hero[]) => {
     this.currentHeroesData = currentUserHeroesData;

    });
   
      this.loadUserHeroes();
  }
  ////function that do next observable is called
  async loadUserHeroes(){
    if(this.localService.isUserLogged()&&this.currentHeroesData.length == 0){
      const [userHeroes, allHeroes] = await Promise.all([
        this.myDataService.getAllUserHeroes(),
        this.myDataService.getAllHeroes()
      ]);

      if(Array.isArray(userHeroes)&&Array.isArray(allHeroes)){
        this.heroesService.updateCurrentHeroesSubject(userHeroes)
        this.heroesService.updateAllHeroesSubject(allHeroes)
      }
   }
  }

  clickBtnHandler(currentHero: any) {

    if(this.heroesService.IsPossibleToTrainTheHero(currentHero)){
      this.heroesService.clickBtnHandler(currentHero);
      this.myDataService.trainHero(currentHero.name)
    }
  }


}
