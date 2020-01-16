import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    var logged = localStorage.getItem("logged");
    if(logged == "true") {
      this.router.navigate(['/profile']);
    }
  }

  signinUser() {    
    console.log('user signin');
    localStorage.setItem("logged", "true");
    this.router.navigate(['/profile']);
  }

  loginUser() {
    console.log('user login');
    localStorage.setItem("logged", "true");
    this.router.navigate(['/profile']);
  }
}
