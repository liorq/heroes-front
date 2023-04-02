import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/service/heroes.service';
import { LocalService } from 'src/app/service/local.service';
import { UserInfoService } from 'src/app/service/user-info.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isUserLogged?: boolean;
  constructor(
    private localService: LocalService,
    private userInfoService: UserInfoService
  ) {}
  ngOnInit(): void {
    this.userInfoService.isUserLogged.subscribe((isUserLogged) => {
      this.isUserLogged = isUserLogged;
    });
  }
  deleteUserInfo() {
    this.localService.deleteUserInfo();
    this.userInfoService.isUserLogged.next(false);
  }
}
