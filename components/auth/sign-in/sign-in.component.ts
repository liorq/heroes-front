import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/components/core/service/heroes.service';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
import Swal from 'sweetalert2';
import { messages} from '../../../app.messages';
import { MyDataService } from '../../core/service/myData.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['../../pages/allHeroes/allHeroes.component.css', './sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  Password: string = '';
  userName: string = '';
  pageRefreshed: boolean = false;

  constructor(
    private router: Router,
    private localService: LocalService,
    private userInfoService: UserInfoService,
    private heroesService: HeroesService,
    private myDataService:MyDataService
  ) {}

  ngOnInit(): void {
    this.localService.initialDataBaseToDefault();
    this.heroesService.usersData=JSON.parse(this.localService.getUsersData()||"[]")
    this.userInfoService.currentUserLogged.subscribe((name: any) => {
      this.localService.updateUserName(name);
    });
  }

  isValidUserInformation() {
    const user = this.userInfoService.isValidUserInformation(
      this.userName,
      this.Password,
      this.heroesService.usersData
    );
    if (user.isValidInfo) {
      this.updateSubjects(user)
      this.myDataService.signIn(this.userName,this.Password)

      this.router.navigate(['/myHeroes']);
    } else
       Swal.fire(messages.usernameIncorrectMessage);
  }

  updateSubjects(user:any){
    this.userInfoService.isUserLogged.next(true);
    this.userInfoService.currentUserLogged.next(user.email);
    const currentHeroesData= this.localService.getLocalUserHeroData();
    this.heroesService.currentHeroesData.next([...currentHeroesData])
  }
}
