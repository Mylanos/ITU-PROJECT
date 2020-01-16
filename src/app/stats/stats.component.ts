import { Component, OnInit } from '@angular/core';
import * as CanvasJS from './canvasjs.min';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    document.getElementById("button").style.display="none";
    document.getElementById("chartContainer1").style.display="none";
    document.getElementById("chartContainer2").style.display="none";
    document.getElementById("chartContainer3").style.display="none";

    var logged = localStorage.getItem("logged");
    if(logged == "true") {
      //display stats
      document.getElementById("chartContainer1").style.display="initial";
      document.getElementById("chartContainer2").style.display="initial";
      document.getElementById("chartContainer3").style.display="initial";
    } 
    else {
      //display button to loginPage
      document.getElementById("button").style.display="initial";
    }

    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", "http://localhost:8080/userstats.json", false);
    xhttp.send();
    var userstats = JSON.parse(xhttp.responseText);

    xhttp.open("GET", "http://localhost:8080/globalstats.json", false);
    xhttp.send();
    var globalstats = JSON.parse(xhttp.responseText);


    CanvasJS.addColorSet("customColorSet1",
      [//colorSet Array
      "#3277a8",
      "224d6b",
     ]); 

     let chart1 = new CanvasJS.Chart("chartContainer1", {
      colorSet:  "customColorSet1",
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Test 1 - Average Score "
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: userstats[0]['avgScore'], label: "Your average score" },
          { y: globalstats[0]['avgScore'], label: "Global average score" }
        ]
      }]
    });
    chart1.render();



    let chart2 = new CanvasJS.Chart("chartContainer2", {
      colorSet:  "customColorSet1",
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Test 2 - Average Score "
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: userstats[1]['avgScore'], label: "Your average score" },
          { y: globalstats[1]['avgScore'], label: "Global average score" }
        ]
      }]
    });
    chart2.render();



    let chart3 = new CanvasJS.Chart("chartContainer3", {
      colorSet:  "customColorSet1",
      animationEnabled: true,
      exportEnabled: false,
      title: {
        text: "Test 3 - Average Score "
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: userstats[2]['avgScore'], label: "Your average score" },
          { y: globalstats[2]['avgScore'], label: "Global average score" }
        ]
      }]
    }); 
    chart3.render();
  }

}
