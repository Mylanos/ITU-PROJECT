import { Component, OnInit, HostListener } from '@angular/core';

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

  @HostListener('window:resize', ['$event'])
  @HostListener('window:scroll', ['$event'])
  scrollFunction(){
    //if scrolled, change header
    if(document.body.scrollTop > 60 || document.documentElement.scrollTop > 60){
      if(document.body.clientWidth < 800){ 
        console.log('testsss');
        document.getElementById("header").style.height = "80px";
        document.getElementById("main-logo").style.width = "100px";
        document.getElementById("horizontalLine").style.height = "40px";
        document.getElementById("horizontalLine").style.marginTop = "18px";
        document.getElementById("web_title").style.marginTop = "22px";
        document.getElementById("nav_button").style.marginRight = "10px";
        document.getElementById("nav_button").style.marginLeft = "60px";
        document.getElementById("nav_button").style.marginTop = "8px";
      }
      else{
        console.log('hahahah');
        document.getElementById("header").style.height = "75px";
        document.getElementById("main-logo").style.width = "100px";
        document.getElementById("horizontalLine").style.height = "40px";
        document.getElementById("horizontalLine").style.marginLeft = "-10px";
        document.getElementById("horizontalLine").style.marginTop = "24px";
        document.getElementById("web_title").style.marginTop = "28px";
        document.getElementById("overlay-content").style.marginTop = "25px";
        document.getElementById("navigation_menu").style.marginLeft = "65px";
      }
     
    }
    else{
      if(document.body.clientWidth < 800){ 
        document.getElementById("header").style.height = "129px";
        document.getElementById("main-logo").style.width = "170px";
        document.getElementById("horizontalLine").style.height = "60px";
        document.getElementById("horizontalLine").style.marginTop = "32px";
        document.getElementById("web_title").style.marginTop = "45px";
        document.getElementById("nav_button").style.marginRight = "5px";
        document.getElementById("nav_button").style.marginTop = "28px";
        document.getElementById("nav_button").style.marginLeft = "0px";
      }
      else{
        document.getElementById("header").style.height = "146px";
        document.getElementById("main-logo").style.width = "180px";
        document.getElementById("horizontalLine").style.height = "80px";
        document.getElementById("horizontalLine").style.marginLeft = "-20px";
        document.getElementById("horizontalLine").style.marginTop = "34px";
        document.getElementById("web_title").style.marginTop = "60px";
        document.getElementById("overlay-content").style.marginTop = "53px";
        document.getElementById("navigation_menu").style.marginLeft = "0px";
      }
      //document.getElementById("navigation_menu").style.width = "27%";

    }
  }

}
