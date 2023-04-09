import { Component, OnInit } from '@angular/core';
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

   ngOnInit() {

    this.localService.initialDataBaseToDefault();

    this.heroesService._currentHeroesData.subscribe((currentUserHeroesData:hero[])=>{
    this.currentHeroesData=currentUserHeroesData;
    })
    this.heroesService._allHeroes.subscribe((heroesData)=>{
      this.heroesData=heroesData;
    })

   this.loadUserHeroes()

  }

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

  addHeroHandler(addedHero: any) {
    if(!this.heroesService.isAddedHeroPossible({...addedHero},[...this.currentHeroesData]))
       return
      this.myDataService.addHero(addedHero.name)
      addedHero.id = Math.floor(Math.random() * 1000000000);
      this.currentHeroesData.push(addedHero)
      this.heroesService.updateCurrentHeroesSubject([... this.currentHeroesData])

    }

}


