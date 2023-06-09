import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeroesService } from 'src/app/components/core/service/heroes.service';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
import Swal from 'sweetalert2';
import { messages} from '../../data/app.messages';
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

  }
////validtionHandler
  async validtionHandler() {

    const hashedPassword=this.userInfoService.getEncryptedPassword(this.Password)
    const isValidInfo= await this.myDataService.signInHandler(this.userName,hashedPassword)
    if(isValidInfo){
    const heroes:any= await this.myDataService.getAllUserHeroes()
     this.updateSubjects(heroes)
     this.router.navigate(['/myHeroes']);
     return
     }
     Swal.fire(messages.usernameIncorrectMessage);

    }

  updateSubjects(heroes:any[]){
    this.userInfoService.updateSubjectIsUserLogged(true)
    this.heroesService.updateCurrentHeroesSubject(heroes)
  }
}
