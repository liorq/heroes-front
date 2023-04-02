import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { AllHeroesComponent } from './components/pages/allHeroes/allHeroes.component';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';
import { MyHeroesComponent } from './components/pages/myHeroes/myHeroes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';
import { SignInComponent } from './components/auth/sign-in/sign-in.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { HeroesListComponent } from './components/core/heroes-list/heroes-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AllHeroesComponent,
    SignUpComponent,
    MyHeroesComponent,
    PageNotFoundComponent,
    SignInComponent,
    FooterComponent,
    HeroesListComponent,
  ],
  imports: [HttpClientModule,BrowserModule, FormsModule, ReactiveFormsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
