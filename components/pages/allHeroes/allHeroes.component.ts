import { Component, OnInit } from '@angular/core';
import { getAllHeroes } from 'src/app/components/data/app-heroes';
import { hero } from 'src/app/components/data/app.interfaces';
import { HeroesService } from 'src/app/components/core/service/heroes.service';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
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
    private userInfoService: UserInfoService
  ) {}

  ngOnInit(): void {

    this.localService.initialDataBaseToDefault();
    const isUserLogged = this.localService.isUserLogged();
    if (isUserLogged)
     this.UpdateUserHeroDataFromLocalStorage();
      this.heroesData=getAllHeroes();
      this.currentHeroesData=this.localService.getLocalUserHeroData();
     this.heroesService.currentHeroesData.subscribe((currentUserHeroesData:hero[])=>{
         this.localService.updateLocalUserHeroes([...currentUserHeroesData]);
    })

  }

  UpdateUserHeroDataFromLocalStorage() {
      const currentHeroData:any[] =this.localService.getLocalUserHeroData()
      this.heroesService.currentHeroesData.next([...currentHeroData])
      this.userInfoService.isUserLogged.next(true);
    }

  addHero(addedHero: any) {
    if(!this.heroesService.isAddedHeroPossible({...addedHero},[...this.currentHeroesData]))
       return

      addedHero.id = Math.floor(Math.random() * 1000000000);
      this.currentHeroesData.push(addedHero)
      this.heroesService.currentHeroesData.next([... this.currentHeroesData]);
    }

}


