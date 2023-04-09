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
import { messages } from 'src/app/components/data/app.messages';
import { HeroesService } from 'src/app/components/core/service/heroes.service';
import { MyDataService } from '../../core/service/myData.service';
import { errorMessages } from '../../data/objects';

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
  firstName!: AbstractControl<any, any> | null;
  lastName!: AbstractControl<any, any> | null;
  age!: AbstractControl<any, any> | null;
  email!: AbstractControl<any, any> | null;
  password!: AbstractControl<any, any> | null;
  errorMessages = errorMessages

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

  async signUpHandler() {
    this.localService.initialDataBaseToDefault();
    const { email, password } = this.subscribeForm.value;
    const hashedPassword = this.userInfoService.getEncryptedPassword(password);
    const isUserAvailable = await this.myDataService.signUp(email, hashedPassword);
    if (isUserAvailable) {
      await this.myDataService.signInHandler(email, hashedPassword);
      this.updateSubjects();
      setTimeout(() => this.router.navigate(['/myHeroes']), 2000);
    }
    Swal.fire(isUserAvailable ? messages.usernameAddedMessage : messages.usernameIsntAvailableMessage);
  }

  updateSubjects(){
    this.userInfoService.updateSubjectIsUserLogged(true)
    this.heroesService.updateCurrentHeroesSubject([])
  }

}
