import { Component, OnInit } from '@angular/core';


import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  users: User[];
  error = '';
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  signinUser() {
    console.log('hahhahahah');
  }

  getUsers(): void {
    
  this.userService.getAll().subscribe(
    (res: User[]) => {
      this.users = res;
    },
    (err) => {
      this.error = err;
    }
  );
  
}

}
