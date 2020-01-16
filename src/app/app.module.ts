import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { SectionIntroComponent } from './section-intro/section-intro.component';
import { SectionTestsComponent } from './section-tests/section-tests.component';
import { FooterComponent } from './footer/footer.component'
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { StatsComponent } from './stats/stats.component';
import { SigninComponent } from './signin/signin.component';
import { HttpClientModule } from '@angular/common/http';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SectionIntroComponent,
    SectionTestsComponent,
    FooterComponent,
    StatsComponent,
    SigninComponent,
    Test1Component,
    Test2Component,
    Test3Component,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary){
    library.addIcons(faTwitter);
    library.addIcons(faFacebook);
    library.addIcons(faInstagram)
  }
}
