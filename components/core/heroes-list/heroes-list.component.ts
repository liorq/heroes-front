import { Component, Input, OnInit } from '@angular/core';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
import { hero } from '../../data/app.interfaces';
import { HeroesService } from '../service/heroes.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: [
    './heroes-list.component.css',
    '../../pages/allHeroes/allHeroes.component.css',
    '../../pages/myHeroes/myHeroes.component.css'
  ],
})
export class HeroesListComponent {
  /////dont remove 2 of this
  constructor(
    public heroesService: HeroesService,
    private localService: LocalService,
    private userInfoService: UserInfoService
  ) {}

  @Input() heroes?: hero[] = [];
  @Input() clickHandler?: any;
  @Input() displayBtnTitle?: string = '';
  @Input() componentName:string=""
  @Input() currentHeroesData: any[] = [];

  updateSubject(){
  if(this.currentHeroesData)
    this.heroesService.currentHeroesData.next(this.currentHeroesData)
}
  sortHeroes(){
    if(this.heroes)
    this.heroes.sort((heroA:hero,heroB:hero)=>heroB.CurrentPower-heroA.CurrentPower)
  }

}
