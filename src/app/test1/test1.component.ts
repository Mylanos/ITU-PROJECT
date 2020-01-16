import { Stats1Service } from './../stats1.service';
/*
Test pozostáva z 5 po sebe idúcich testov,
pri čom prvé kolo si užívateľ musí zapamätať 4 číslice,
druhé kolo 5, ...  a piate kolo 8 číslic. Bodové ohodnotenie
sa rovná počtu uhádnutých číslic na spávnom indexe 
(ak budú číslice 2-8-6-4-2 a užívateľ zadá 2-8-0-4-1) získa
za toto kolo 3 body, pretože správne zadal 3 číslice.
*/

import { Component, OnInit, HostListener } from '@angular/core';
import { I18nSelectPipe } from '@angular/common';
import * as CanvasJS from '../canvasjs.min';
declare var $: any;

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})

export class Test1Component{
  
  ngAfterViewInit(){
    console.log('zavolalo ma toooo');
    this.statsService.initResults();
  }

  constructor(
    public statsService: Stats1Service
  ){}

  private  startLength = 4;         //Number of testing elements
  private finalLength = 7;
  private points = 0;
  private intervalInc = 0;
  
  private stepBar = [25, 20, 16.66, 14.28];
  private result = "";
  private timeCounter = 3;
  private randomTestNum: number;
  private testNumbers: number [] = new Array();
  private inputNumbers: number [] = new Array();
  private inputNumbersLength = 0;
  private fullTestNumbers: number [] = new Array();
  private fullInputNumbers: number [] = new Array();  




  initDifficulty(difficulty: number){
    if(difficulty == 1){
      this.startLength = 4;
      this.finalLength = 7;
      this.stepBar = [25, 20, 16.66, 14.28];
    }
    else if (difficulty == 2){
      this.startLength = 5;
      this.finalLength = 8;
      this.stepBar = [20, 16.66, 14.28, 12.5]
    }
    else{
      this.startLength = 6;
      this.finalLength = 9;
      this.stepBar = [16.66, 14.28, 12.5, 11.11, 10];
    }
    console.log(this.startLength);
  }

  explClick() {
    //hide guide
    document.getElementById("btn").style.display = "none";
    document.getElementById("instructions").style.display = "none";
    document.getElementById("frontText").textContent = "Test starts in:";
    document.getElementById("frontTime").style.display = "initial";
    document.getElementById("test1radioButtons").style.display = "none";
    this.startCountdown();
  }

  startCountdown() {
    
    let intervalId = setInterval(() => {
      this.timeCounter = this.timeCounter - 1;
      if(this.timeCounter === 0) {
        clearInterval(intervalId);
        document.getElementById("progress").style.display = "block";
        this.startTest();
      }
    }, 1000)
  }

  getTimeCounter() {
    return this.timeCounter;
  }

  startTest() {
    var current_progress = 0;
    $("#dynamic").attr("aria-valuenow", current_progress);
    document.getElementById("frontWindow").style.display = "none";
    document.getElementById("display").style.display = "block";
    var numCounter = 0;

    this.randomTestNum = Math.floor(Math.random() * 10);
    this.testNumbers.push(this.randomTestNum);
    this.fullTestNumbers.push(this.randomTestNum);
    current_progress += this.stepBar[this.intervalInc];
    $("#dynamic")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      .text(current_progress + "% Complete");
    numCounter = numCounter + 1;

    //generating numbers
    let genIntervalId = setInterval(() => {
      if(numCounter >= this.startLength) {
        clearInterval(genIntervalId);
        $("#dynamic")
        .css("width", "0%")
        .attr("aria-valuenow", 0)
        .text("0% Complete");
        this.hideNumberBar()
        this.intervalInc = this.intervalInc + 1;
        return;
      }

      //progress bar
      current_progress += this.stepBar[this.intervalInc];
      $("#dynamic")
      .css("width", current_progress + "%")
      .attr("aria-valuenow", current_progress)
      .text(Math.round(current_progress) + "% Complete");

      do{
      this.randomTestNum = Math.floor(Math.random() * 10);
      } while(this.randomTestNum == this.testNumbers[numCounter-1]);

      this.testNumbers.push(this.randomTestNum);
      this.fullTestNumbers.push(this.randomTestNum);
      numCounter = numCounter + 1;
    }, 1200)     //interval between nums

  }

  hideNumberBar() {
    document.getElementById("display").style.display = "none";
    document.getElementById("keyboard").style.display = "block";
    document.getElementById("results_box").style.display = "block";
  }

  numberClick(inNumber: number) {
    if(this.inputNumbersLength < this.startLength){
      this.inputNumbers.push(inNumber);
      this.fullInputNumbers.push(inNumber);
      this.inputNumbersLength = this.inputNumbersLength + 1;
    }
    return;  
  }

  deleteClick(){
    if(this.inputNumbersLength > 0){
      this.testNumbers.pop();
      this.inputNumbers.pop();
      this.inputNumbersLength = this.inputNumbersLength - 1;
    }
  }

  nextRound() {
    if(this.inputNumbersLength >= this.startLength){
      if(this.startLength == this.finalLength) {
        this.endTest();
        return;
      }
      else{
        this.startTest();
      }
      document.getElementById("keyboard").style.display = "none";
      this.inputNumbersLength = 0;

      document.getElementById("input").style.display = "initial";
      document.getElementById("results_box").style.display = "none";

      //clear arrays
      for(var i=0; i<this.startLength; i++){
        this.testNumbers.pop();
        this.inputNumbers.pop();
      }

      this.startLength += 1;
    }
    else{
      var counter = 0;
      document.getElementById("warnings").textContent = this.startLength + " numbers expected, you entered " + this.inputNumbersLength + "!";
      document.getElementById("warnings").style.color = "red";
      let intervalId2 = setInterval(() => {
        if(counter > 2){
          document.getElementById("warnings").textContent = "";
          counter = 0;
          intervalId2 = setInterval(()=>{}, 1000);
          return;
        }
        counter = counter + 1;
      }, 1000)
    }
  }

  calcScore(){
    var inputedValues = 0;
    for(var n = 4; n <= this.inputNumbersLength; n++){
      inputedValues = inputedValues + n;
    }
    console.log("hahaha ", inputedValues);
    for(var i=0; i<inputedValues; i++){      //4+5+6+7+8
      if(this.fullInputNumbers[i] == this.fullTestNumbers[i]) {
        this.points += 1;
      }
    }
    this.statsService.addResult(this.points);
  }

  restartTest(){
    location.reload();
  }

  endTest() {
    var results = this.statsService.getResults();
    console.log(results);
    this.calcScore();

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/script.php", false);
    xhttp.setRequestHeader("TEST1", (this.points).toString());
    xhttp.send();
  
    console.log('TEST 1 ', xhttp.responseText);

    xhttp.open("GET", "http://localhost:8080/test1.json", false);
    xhttp.send();
    var obj = JSON.parse(xhttp.responseText);

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: false,
      zoomEnabled: true,
      backgroundColor: "#eee",
      title: {
        text: "Average scores"
      },
      data: [{
        type: "column",
        horizontalAlign: "center",
        verticalAlign: "center",
        dataPoints: [
          { y: obj[0]['score1'], label: "1" },
          { y: obj[0]['score2'], label: "2" },
          { y: obj[0]['score3'], label: "3" },
          { y: obj[0]['score4'], label: "4" },
          { y: obj[0]['score5'], label: "5" },
          { y: obj[0]['score6'], label: "6" },
          { y: obj[0]['score7'], label: "7" },
          { y: obj[0]['score8'], label: "8" },
          { y: obj[0]['score9'], label: "9" },
          { y: obj[0]['score10'], label: "10" },
          { y: obj[0]['score11'], label: "11" },
          { y: obj[0]['score12'], label: "12" }
        ]
      }]
    });
      
    chart.render();

    document.getElementById("chartContainer").style.display = "block";
    document.getElementById("results_box").style.height = "600px";
    document.getElementById("results_box").style.width = "800px";
    document.getElementById("keyboard").style.display = "none";
    document.getElementById("input").style.display = "none";
    document.getElementById("result").style.display = "initial";
    document.getElementById("test1_reload").style.display = "block";
    this.result = "You score is " + this.points.toString() + " points!";
  }

  getResult() {
    return this.result;
  }

  getInputNumbers() {
    var string: string;
    var inc = this.inputNumbersLength;
    string = this.inputNumbers.join(" ");
    while(inc < this.startLength){
      string = string + " _ ";
      inc = inc + 1;
    }
    return string;
  }

  getRandomTestNum() {
    return this.randomTestNum;
  }

  reloadPage(){
    location.reload();
  }

}