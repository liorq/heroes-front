import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { LocalService } from 'src/app/components/core/service/local.service';
import { UserInfoService } from 'src/app/components/core/service/user-info.service';
import { messages } from 'src/app/app.messages';
import { HeroesService } from 'src/app/components/core/service/heroes.service';
import { MyDataService } from '../../core/service/myData.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: [
    '../../pages/allHeroes/allHeroes.component.css',
    './sign-up.component.css',
  ],
})
export class SignUpComponent implements OnInit {
  constructor(
    private router: Router,
    private localService: LocalService,
    public userInfoService: UserInfoService,
    private heroesService: HeroesService,
    private myDataService: MyDataService
  ) {}
  subscribeForm!: FormGroup;
  firstName: any;
  lastName: any;
  age: any;
  email: any;
  password: any;
  errorMessages = {
    password:
      'The password needs to contain at least 8 characters, at least one uppercase letter, at least one number, and at least one special character',
    age: 'You must be at least 12 years old to signup.',
    email: 'Invalid email address. Please enter a valid email address.',
    lastName: 'Last name must be at least 4 characters.',
    firstName: 'First name must be at least 4 characters.',
  };

  ngOnInit(): void {
    this.formInitialization();
  }

  formInitialization() {
    this.subscribeForm = new FormGroup({
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
      ]),
      lastName: new FormControl('', [Validators.required]),
      age: new FormControl(0, [Validators.required, Validators.min(12)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        this.userInfoService.passwordValidator,
        Validators.minLength(8),
      ]),
    });

    this.firstName = this.subscribeForm.get('firstName');
    this.lastName = this.subscribeForm.get('lastName');
    this.age = this.subscribeForm.get('age');
    this.email = this.subscribeForm.get('email');
    this.password = this.subscribeForm.get('password');
  }


  ////handler
  async signUp() {
    this.localService.initialDataBaseToDefault();
    const newUser = { ...this.subscribeForm.value };

      const isUserAvailable = await this.myDataService.signUp(newUser.email, newUser.password);
      if (isUserAvailable) {
        await this.myDataService.signInHandler(newUser.email, newUser.password);
        this.updateSubjects()
        setTimeout(() => {
          this.router.navigate(['/myHeroes']);
        }, 2000);
      }
        Swal.fire(isUserAvailable?messages.usernameAddedMessage:messages.usernameIsntAvailableMessage)
  }

  updateSubjects(){
    this.userInfoService.updateSubjectIsUserLogged(true)
    this.heroesService.updateCurrentHeroesSubject([])
  }

}
