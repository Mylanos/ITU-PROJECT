import { Injectable, HostListener } from '@angular/core';
import { stringify } from 'querystring';

@Injectable({
  providedIn: 'root'
})
export class Stats1Service {

  results1 = [];
  constructor() { }

  ammount: number [] = new Array(50);

  private obj = {
    table: []
 };

  initResults(){
    console.log('aaaaaa');
    if(this.results1){
      var score = 0;
      var size;
      while(score < 30){
        console.log("robiim tu kokocicjnnuuu")
        if(score < 6){
          size = score * 2;
        }
        else if(score > 6 && score < 10){
          size = score * 3;
        }
        else if(score > 10 && score < 15){
          size = size - 4;
        }
        else{
          if(size > 0){
            size = size -1;
          }
          else{
            size = 0;
          }
        }
        this.results1.push({score: score, square: size});
        this.ammount.push(size);
        score = score + 1;
      }
    }
    console.log(this.results1);
  }

  addResult(value: number){
    this.ammount[value] = this.ammount[value] + 1;
    this.results1.push({score: value, square: this.ammount[value]});
  }

  getResults() {
    return this.results1;
  }

}
