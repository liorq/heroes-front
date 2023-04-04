import { Component, OnInit } from '@angular/core';
import { getAllHeroes } from 'src/app/components/data/app-heroes';
import { hero } from 'src/app/components/data/app.interfaces';
import { HeroesService } from 'src/app/components/core/service/heroes.service';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
import { MyDataService } from '../../core/service/myData.service';
@Component({
  selector: 'app-main',
  templateUrl: './allHeroes.component.html',
  styleUrls: ['./allHeroes.component.css'],
})

export class AllHeroesComponent implements OnInit {
  heroesData: any[] = [];
  currentHeroesData: hero[]=[];

  constructor(
    private heroesService: HeroesService,
    private localService: LocalService,
    private userInfoService: UserInfoService,
    private myDataService: MyDataService
  ) {}

  async ngOnInit() {

    this.localService.initialDataBaseToDefault();
    const isUserLogged = this.localService.isUserLogged();
    if (isUserLogged)
    this.heroesData=getAllHeroes();

     this.heroesService.currentHeroesData.subscribe((currentUserHeroesData:hero[])=>{
    this.currentHeroesData=currentUserHeroesData||this.myDataService.getAllUserHeroes();

    })

  }



  addHero(addedHero: any) {
    if(!this.heroesService.isAddedHeroPossible({...addedHero},[...this.currentHeroesData]))
       return
      this.myDataService.addHero(addedHero.name)
      addedHero.id = Math.floor(Math.random() * 1000000000);
      this.currentHeroesData.push(addedHero)

      this.heroesService.currentHeroesData.next([... this.currentHeroesData]);
    }

}


