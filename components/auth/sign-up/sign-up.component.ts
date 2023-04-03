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
    this.userInfoService.currentUserLogged.subscribe((name: any) => {
      this.localService.updateUserName(name);
    });
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
        this.passwordValidator,
        Validators.minLength(8),
      ]),
    });

    this.firstName = this.subscribeForm.get('firstName');
    this.lastName = this.subscribeForm.get('lastName');
    this.age = this.subscribeForm.get('age');
    this.email = this.subscribeForm.get('email');
    this.password = this.subscribeForm.get('password');
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const isValidPassword = !passwordRegex.test(control.value);
    return isValidPassword ? { passwordInvalid: true } : null;
  }
  ////handler
  signUp() {
    this.localService.initialDataBaseToDefault();
    const newUser = { ...this.subscribeForm.value };
    ////////



    Swal.fire(messages.usernameIsntAvailableMessage);


    this.updateSubjects(newUser)
    this.myDataService.signUp(newUser)
    this.myDataService.signIn(newUser.email,newUser.password)

    Swal.fire(messages.usernameAddedMessage);
    setTimeout(() => {
      this.router.navigate(['/myHeroes']);
    }, 2000);

  }
  updateIndex(){
    const usersDataLength: any =this.heroesService.usersData.length
    this.localService.setIndex(usersDataLength === '' ? 0 : usersDataLength - 1);
  }
  updateSubjects(newUser:any){
    this.userInfoService.isUserLogged.next(true);
    this.userInfoService.currentUserLogged.next(newUser.email);
  }
  updateNewUser(newUser:any){
    this.heroesService.usersData.push({
      email: newUser.email,
      password: newUser.password,
      heroes: [],
    });
    this.localService.setUsersData([...this.heroesService.usersData]);
  }
}
