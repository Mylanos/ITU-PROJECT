
/*
Test pozostáva z náhodne sa generujúcich obrázkov, úlohou si je zapamätať vygenerované obrázky, 
ak sa obrazok zopakuje a ak užívateľ si to všimne, na obrázok klikne tak sa mu zvýši skore.. nvm dalej
som to moc nedomyslel.. možno nejak odpočitavať skore za zlu odpoved / alebo po nej hned test skončiť...
*/

import { Component, OnInit } from '@angular/core';
import { I18nSelectPipe } from '@angular/common';
import { range } from 'rxjs';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component {

  static testLenght = 4;         //Number of testing elements
  private points = 0;

  private result = "";
  private timeCounter = 3;


  private numCounter = 0;
  private index = -1;
  public currentScore = 0;
  private clickedIndex: number [] = new Array();
  private allGeneratedIndexes: number [] = new Array();

  private randomTestNum: number;
  private testNumbers: number [] = new Array();
  private inputNumbers: number [] = new Array();


  explClick() {
    //hide guide
    document.getElementById("btn").style.display = "none";
    document.getElementById("frontText").textContent = "Test starts in:";
    document.getElementById("frontTime").style.display = "initial";
    Test3Component.testLenght = 20;
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

  imageClick() {
    if(this.index != this.getNumberIndex()){
      this.index = this.getNumberIndex();
      this.clickedIndex.push(this.index);
      console.log(this.index);
      console.log(this.clickedIndex.length);
    }
    if (this.allGeneratedIndexes === undefined || this.allGeneratedIndexes.length == 0) {
      return;
    }
    this.allGeneratedIndexes.forEach(this.calcScore);
  
    return;
  }

  calcScore(value: number){
    var i = 0;
    //
    while( i < (this.allGeneratedIndexes.length)){
      if( value == this.allGeneratedIndexes[i]){
        this.currentScore = this.currentScore + 1;
      }
      i = i + 1;
    }
  }

  startTest() {
    document.getElementById("frontWindow").style.display = "none";
    document.getElementById("display").style.display = "none";
    let imgElement: HTMLElement = document.getElementById('divImage');

    this.randomTestNum = Math.floor((Math.random() * 20)+1);
    this.allGeneratedIndexes.push(this.randomTestNum);

    let genIntervalId = setInterval(() => {
      if(this.numCounter >= Test3Component.testLenght) {
        clearInterval(genIntervalId);
        this.hideNumberBar()
        return;
      }
      
      imgElement.innerHTML = `
          <img class="dynamicImage" src="../../assets/imggen/img${this.randomTestNum}.jpg" 
          style="width:70vh;">
      `
      do{
      this.randomTestNum = Math.floor((Math.random() * 20)+1);
      } while(this.randomTestNum == this.testNumbers[this.numCounter-1]);

      this.allGeneratedIndexes.push(this.randomTestNum);
      this.numCounter = this.numCounter + 1;
    }, 1500)     //interval between nums
  }

  hideNumberBar() {
    document.getElementById("display").style.display = "none";
    document.getElementById("keyboard").style.display = "block";
    document.getElementById("results_box").style.display = "block";
    document.getElementById("nextRound").style.display = "none";
  }

  endTest() {
    document.getElementById("input").style.display = "none";
    document.getElementById("result").style.display = "initial";
    document.getElementById("test1_reload").style.display = "block";
    this.result = "You achieved " + this.points.toString() + " points";
  }

  getNumberIndex(){
    return this.numCounter;
  }

  getResult() {
    return this.currentScore;
  }

  getInputNumbers() {
    return this.inputNumbers.toString();
  }

  getRandomTestNum() {
    return this.randomTestNum;
  }

  reloadPage(){
    location.reload();
  }

}