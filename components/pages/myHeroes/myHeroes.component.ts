import { Component, OnInit } from '@angular/core';
import { hero } from '../../../app.interfaces';
import { HeroesService } from 'src/app/service/heroes.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';

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
    public userInfoService: UserInfoService
  ) {}

  currentHeroesData: any = [];

  ngOnInit() {
    this.localService.initialDataBaseToDefault();
    if (this.localService.isUserLogged())
      this.UpdateUserHeroDataFromLocalStorage();

    this.heroesService.currentHeroesData.subscribe((currentUserHeroesData: hero[]) => {
        this.localService.updateLocalUserHeroes([...currentUserHeroesData]);
      });

    this.currentHeroesData = this.localService.getLocalUserHeroData();
  }

  UpdateUserHeroDataFromLocalStorage() {
    const data = this.localService.getLocalUserHeroData();
    this.heroesService.currentHeroesData.next([...data]);
    this.userInfoService.isUserLogged.next(true);
  }

  clickBtnHandler(currentHero: any) {
    this.heroesService.clickBtnHandler(currentHero);
  }

  updateUserHeroes(currentHeroData: any[]) {
    this.localService.updateLocalUserHeroes(currentHeroData);
  }
}
