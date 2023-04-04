import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/components/core/service/heroes.service';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLogged?: boolean;
  constructor(
    private localService: LocalService,
    private userInfoService: UserInfoService,
    private heroesService: HeroesService,

  ) {}
  ngOnInit(): void {


    this.userInfoService.isUserLogged.subscribe((isUserLogged) => {
      this.isUserLogged = isUserLogged
    });
    if(this.localService.isUserLogged()){
      this.isUserLogged=  this.localService.isUserLogged()
    }
  }
  deleteUserInfo() {
    this.userInfoService.isUserLogged.next(false);
    this.heroesService.currentHeroesData.next([])
    this.localService.setToken();

  }
}
