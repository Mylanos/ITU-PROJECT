/*
Test pozostáva z 5 po sebe idúcich testov,
pri čom prvé kolo si užívateľ musí zapamätať 4 číslice,
druhé kolo 5, ...  a piate kolo 8 číslic. Bodové ohodnotenie
sa rovná počtu uhádnutých číslic na spávnom indexe 
(ak budú číslice 2-8-6-4-2 a užívateľ zadá 2-8-0-4-1) získa
za toto kolo 3 body, pretože správne zadal 3 číslice.
*/

import { Component, OnInit } from '@angular/core';
import { I18nSelectPipe } from '@angular/common';
import { range } from 'rxjs';

@Component({
  selector: 'app-test1',
  templateUrl: './test1.component.html',
  styleUrls: ['./test1.component.css']
})
export class Test1Component {

  static testLenght = 4;         //Number of testing elements
  private points = 0;

  private result = "";
  private timeCounter = 3;
  private randomTestNum: number;
  private testNumbers: number [] = new Array();
  private inputNumbers: number [] = new Array();
  private fullTestNumbers: number [] = new Array();
  private fullInputNumbers: number [] = new Array();

  explClick() {
    //hide guide
    document.getElementById("btn").style.display = "none";
    document.getElementById("frontText").textContent = "Test starts in:";
    document.getElementById("frontTime").style.display = "initial";
    Test1Component.testLenght = 4;
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
    document.getElementById("frontWindow").style.display = "none";
    var numCounter = 0;

    this.randomTestNum = Math.floor(Math.random() * 10);
    this.testNumbers.push(this.randomTestNum);
    this.fullTestNumbers.push(this.randomTestNum);
    numCounter = numCounter + 1;

    //generating numbers
    let genIntervalId = setInterval(() => {
      if(numCounter >= Test1Component.testLenght) {
        clearInterval(genIntervalId);
        this.hideNumberBar()
        return;
      }

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
    document.getElementById("keyboard").style.display = "inline-block";
  }

  numberClick(inNumber: number) {
    this.inputNumbers.push(inNumber);
    this.fullInputNumbers.push(inNumber);
    if(this.inputNumbers.length >= Test1Component.testLenght){
      document.getElementById("keyboard").style.display = "none";
      if(Test1Component.testLenght == 8) {
        document.getElementById("nextRound").innerText = "Show results";
        document.getElementById("nextRound").style.display = "initial";
      } else {
        document.getElementById("nextRound").style.display = "initial";
      }
      return;
    }
  }

  nextRound() {
    document.getElementById("nextRound").style.display = "none";
    
    if(Test1Component.testLenght == 8) {
      this.endTest();
      return;
    }

    document.getElementById("display").style.display = "initial";
    document.getElementById("input").style.display = "initial";

    //clear arrays
    for(var i=0; i<Test1Component.testLenght; i++){
      this.testNumbers.pop();
      this.inputNumbers.pop();
    }

    Test1Component.testLenght += 1;
    if(Test1Component.testLenght < 9) {   //starts at 4nums, 5rounds = max 8nums
      this.startTest();
    } else {
      this.endTest();
    }
  }

  endTest() {
    for(var i=0; i<30; i++){      //4+5+6+7+8
      if(this.fullInputNumbers[i] == this.fullTestNumbers[i]) {
        this.points += 1;
      }
    }
    document.getElementById("input").style.display = "none";
    document.getElementById("result").style.display = "initial";
    this.result = "You achieved " + this.points.toString() + " points";
  }

  getResult() {
    return this.result;
  }

  getInputNumbers() {
    return this.inputNumbers.toString();
  }

  getRandomTestNum() {
    return this.randomTestNum;
  }

}
