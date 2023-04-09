import { Component, Input, OnInit } from '@angular/core';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
import { hero } from '../../data/app.interfaces';
import { HeroesService } from '../service/heroes.service';
import { MyDataService } from '../service/myData.service';

@Component({
  selector: 'app-heroes-list',
  templateUrl: './heroes-list.component.html',
  styleUrls: [
    './heroes-list.component.css',
    '../../pages/allHeroes/allHeroes.component.css',
    '../../pages/myHeroes/myHeroes.component.css'
  ],
})
export class HeroesListComponent implements OnInit {
  /////dont remove 3 of this
  constructor(
    public heroesService: HeroesService,
    private localService: LocalService,
    private userInfoService: UserInfoService,
    private myDataService: MyDataService
  ) {}

  @Input() heroes?: hero[] = [];
  @Input() clickHandler?: any;
  @Input() displayBtnTitle?: string = '';
  @Input() componentName:string=""
  @Input() currentHeroesData: any[] = [];
ngOnInit(): void {
  this.sortHeroes()
}
  updateSubject(){
  if(this.currentHeroesData)
  this.heroesService.updateCurrentHeroesSubject(this.currentHeroesData)

}
  sortHeroes(){
    if(this.heroes)
    this.heroes.sort((heroA:hero,heroB:hero)=>heroB.currentPower-heroA.currentPower)
  }

}
