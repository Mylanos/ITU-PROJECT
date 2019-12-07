import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  closeNav() {
    var overlayContent = document.getElementById('overlay-content');
    var navMenu = document.getElementById('navigation_menu');
    if (document.documentElement.clientWidth > 800){
        overlayContent.style.width = "50%";
    } else{
        navMenu.style.width = "0%";
    }
  }

  openNav() {
    document.getElementById("navigation_menu").style.width = "100%";
  }
  constructor() { }

  ngOnInit() {
  }

}
