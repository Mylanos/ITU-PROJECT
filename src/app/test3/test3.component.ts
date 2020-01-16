/*
Zobrazuje sa 20 obrázkov v náhodnom poradí z výberu 10 náhodných.
To znamená, že na začiatku sa vyberie 10 obrázkov z priečinku /assets a 
postupne sa náhodne z nich vyberá a zobrazujú sa. Používateľ má kliknúť na tlačidlo,
ak už daný obrázok predtým v teste videl. Za spávnu odpoveď sa pripočítava jeden bod,
za nesprávnu sa jeden bod odráta.
*/

import { Component, OnInit } from '@angular/core';
import { TimeInterval, timer } from 'rxjs';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component implements OnInit {

  private timeCounter = 3;
  private timerSet = 200;

  private intervalTimer: NodeJS.Timer;

  private imgNumber = 1;

  private choosedImages: number [] = new Array();
  private lastImage = -1;

  private displayedImages: number [] = new Array();

  private imageCounter = 0;

  private pointScore = 0;

  ngOnInit() {
    //randomly choose 10 pictures (of 22)
    var genNumber = -1;
    var newGen = false;

    do {
      genNumber = Math.floor(Math.random() * 22)+1;     //gens 0...21 +1

      for(var i=0; i<this.choosedImages.length; i++) {
        if(this.choosedImages[i] == genNumber){
          newGen = true;
          break;
        }
      }
      if(newGen == true){
        newGen = false;
        continue;
      } else {
        this.choosedImages.push(genNumber);
      }
    } while(this.choosedImages.length < 10);
  }

  explClick() {
    //hide guide
    document.getElementById("btn").style.display = "none";
    document.getElementById("frontText").textContent = "Test starts in:";
    document.getElementById("frontTime").style.display = "initial";
    this.startCountdown();
  }

  startCountdown() {
    let intervalId = setInterval(() => {
      this.timeCounter = this.timeCounter - 1;
      if(this.timeCounter === 0) {
        clearInterval(intervalId);
        this.startTest();
      }
    }, 1000)
  }

  getTimeCounter() {
    return this.timeCounter;
  }

  startTest() {
    document.getElementById("frontWindow").style.display = "none";        //hide front window
    document.getElementById("test").style.display = "inline-block";       //display test

    this.startTimer();

    this.showImage("");

  }

  getImgSource() {
    return "../../../assets/imggen/img" + this.imgNumber + ".jpg";
  }

  showImage(callFrom: string) {


    if(this.imageCounter >= 20){
      this.endTest();
      return;
    }

    this.imageCounter += 1;

    var img: number;
    do {
      img  = Math.floor(Math.random() * 10);     //gens 0...9
    } while(this.lastImage == img);
    this.lastImage = img;

    //choose real image from random array index
    this.imgNumber = this.choosedImages[img];

    var pushFlag = true;
    //save displayed images
    for(var i=0; i < this.displayedImages.length; i++) {
      if(this.displayedImages[i] == this.imgNumber) {
        pushFlag = false;
        break;
      }
    }
    if(pushFlag) {
      this.displayedImages.push(this.imgNumber);
    }


    this.timerSet = 200;
    if(callFrom == "timer") {
      clearInterval(this.intervalTimer);
      this.startTimer();
    }
  }

  getPoints() {
    return this.pointScore;
  }

  btnClick() {
    for(var i=0; i<this.displayedImages.length-1; i++) {
      if(this.displayedImages[i] == this.imgNumber) {
        this.pointScore += 1;
        this.showImage("");
        return;
      }
    }
    this.pointScore -= 1;
    this.showImage("");
    return;
  }

  startTimer() {
     this.intervalTimer = setInterval(() => {
      this.timerSet -= 1;
      if(this.timerSet === 0) {
        this.showImage("timer");
      }
    }, 10)
  }

  endTest() {
    clearInterval(this.intervalTimer);

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/script.php", false);
    xhttp.setRequestHeader("TEST3", (this.pointScore).toString());
    xhttp.send();

    console.log('TEST 3 ', xhttp.responseText);

    document.getElementById("test").style.display = "none";
    document.getElementById("results").style.display = "inline-block";
    document.getElementById("frontWindow").style.display = "inline-block";        //hide front window
    document.getElementById("frontText").style.display = "none";        //hide front window
    document.getElementById("frontTime").style.display = "none";        //hide front window
  }

  restartTest() {

  this.lastImage = -1;
  this.imageCounter = 0;
  this.pointScore = 0;

  for(var i=0; i < this.choosedImages.length; i++) {
    this.choosedImages.pop();
  }
  for(var j=0; j < this.displayedImages.length; j++) {
    this.displayedImages.pop();
  }
  document.getElementById("results").style.display = "none";
  this.ngOnInit();
  this.startTest();
  }
}