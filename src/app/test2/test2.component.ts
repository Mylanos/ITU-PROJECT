/*
Vygeneruje maticu 3x3 s náhodne uloženými číslami 1-9.
Čísla sa po určitom časovom intervale zakryjú a užívateľ
bude mať za úlohu odklikať umiestnenie čísel v správnom 
poradí od 1 po 9.
(Je to extrémne hard ale zaujímavé, lebo šimpanz to dokáže)
*/

import { Component, OnInit, Input } from '@angular/core';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})


export class Test2Component implements OnInit {

  private genNumberArray: number [] = new Array();
  private timeCounter = 3;
  private hideNumbersFlag: boolean [] = new Array();
  private testStartFlag = false;
  private expectedInput = 1;
  private result = "Your score: (tu môže byť aj nejaký fancy graf že ako ti to išlo)";

  ngOnInit() {

    //vyplní sa 9 indexov flag array
    for(var f=0; f<9; f++) {
      this.hideNumbersFlag.push(false);
    }

    //oninit sa vygeneruje matica
    var genNumber = -1;
    var newGen = false;

    do {
      genNumber = Math.floor(Math.random() * 9) + 1;

      for(var i=0; i<this.genNumberArray.length; i++) {
        if(this.genNumberArray[i] == genNumber){
          newGen = true;
          break;
        }
      }
      if(newGen == true){
        newGen = false;
        continue;
      } else {
        this.genNumberArray.push(genNumber);
      }
    } while(this.genNumberArray.length < 9);

    document.getElementById("showRes").style.display = "none";
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




  //called from html
  getNumber(position: number) {
    //array of flags -> posiible to control single elements
    if(this.hideNumbersFlag[position - 1]) {
      return 'X';
    } else {
      return this.genNumberArray[position - 1]; //indexing from 0
    }
  }





  startTest() {
    document.getElementById("results").style.display = "none";            //hide results
    document.getElementById("countBar").className = "animate";            //change class to start animation
    document.getElementById("countDown").style.display = "inline-block";  //display countdown
    document.getElementById("frontWindow").style.display = "none";        //hide front window
    document.getElementById("test").style.display = "inline-block";       //display test

    //wait 15 seconds -> if change timing, see also css file (.animate{...})
    var delayCounter=15;
    let intervalId = setInterval(() => {
      delayCounter = delayCounter - 1;
      if(delayCounter === 0) {
        clearInterval(intervalId);
        //after time interva, hide countdown bar and hide numbers
        document.getElementById("countDown").style.display = "none";
        for(var f=0; f<9; f++) {
          this.hideNumbersFlag[f] = true;
        }
        this.testStartFlag = true;
      }
    }, 1000)
  }




  numberClick(num: number) {
    //if test started
    if(this.testStartFlag) {
      if(this.genNumberArray[num - 1] == this.expectedInput) {
        //show number
        this.hideNumbersFlag[num -1] = false;
        this.expectedInput += 1;
      }
      else {
        this.testStartFlag = false;       //disable clicking

        //show all numbers and color:red
        for(var i=0; i<9; i++) {
          this.hideNumbersFlag[i] = false;
        }

        var x = document.getElementById("test").querySelectorAll("button");  
        x[num-1].style.backgroundColor = "#E93E3E";
        x[num-1].style.borderColor = "#E93E3E";

        document.getElementById("showRes").style.display = "initial";
      }
    }
    if(this.expectedInput == 10) {
      this.endTest(true);
    }
  }


  showResults() {
    document.getElementById("showRes").style.display = "none";
    this.endTest(false);
  }


  endTest(state: boolean) {


    //tu skúsime XmlHttpRequest-ovať
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/script.php", false);
    xhttp.setRequestHeader("TEST2", (this.expectedInput-1).toString());
    xhttp.send();
    console.log(xhttp.responseText);

    xhttp.open("GET", "http://localhost:8080/test2.json", false);
    xhttp.send();
    var obj = JSON.parse(xhttp.responseText);

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: obj[0]['score1'], label: "1" },
          { y: obj[0]['score2'], label: "2" },
          { y: obj[0]['score3'], label: "3" },
          { y: obj[0]['score4'], label: "4" },
          { y: obj[0]['score5'], label: "5" },
          { y: obj[0]['score6'], label: "6" },
          { y: obj[0]['score7'], label: "7" },
          { y: obj[0]['score8'], label: "8" },
          { y: obj[0]['score9'], label: "9" }
        ]
      }]
    });
      
    chart.render();

    document.getElementById("test").style.display = "none";
    document.getElementById("results").style.display = "inline-block";
    document.getElementById("frontWindow").style.display = "inline-block"; 
    document.getElementById("frontTime").style.display = "none";
    document.getElementById("frontText").style.display = "none";
    if(state){
      this.result = "U lucker (or cheater) achieved 9 points + extra hyper bonus +10p";
    } else {
      this.expectedInput -= 1;
      this.result = this.result + this.expectedInput.toString();
    }
  }




  getResult() {
    return this.result;
  }




  restartTest() {
    for(var i=0; i<9; i++) {
      this.hideNumbersFlag.pop();
      this.genNumberArray.pop();
    }
    this.expectedInput = 1;
    this.result = "Your score: ";

    var x = document.getElementById("test").querySelectorAll("button");  
    
    for(var i=0; i<9; i++) {
      x[i].style.backgroundColor = "white";
      x[i].style.borderColor = "white";
    }

    document.getElementById("results").style.display = "none";
    document.getElementById("countBar").className = "";            //change class for animation

    this.ngOnInit();
    this.startTest();
  }
}
