import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  title = "Choose one of the tests"

  testDescriptions = [
    "description",
    "description",
    "description",
    "description",
    "description",
    "description"
  ]

  constructor() { }

  ngOnInit() {
  }

  getTitle() {
    return this.title;
  }
}
