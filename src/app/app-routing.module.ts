import { LoginComponent } from './components/login/login.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Test1Component } from '../app/components/test1/test1.component';
import { Test2Component } from '../app/components/test2/test2.component';
import { Test3Component } from '../app/components/test3/test3.component';


const routes: Routes = [
  {path: '', component: MainMenuComponent},
  {path: 'test1', component: Test1Component},
  {path: 'test2', component: Test2Component},
  {path: 'test3', component: Test3Component},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
