import { StatsComponent } from './stats/stats.component';
import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';
import { Test3Component } from './test3/test3.component';
import { SigninComponent } from './signin/signin.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SectionIntroComponent } from './section-intro/section-intro.component';

const routes: Routes = [
  {path: '', component: SectionIntroComponent},
  {path: 'domain', component: SectionIntroComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'test1', component: Test1Component},
  {path: 'test2', component: Test2Component},
  {path: 'test3', component: Test3Component},
  {path: 'stats', component: StatsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
