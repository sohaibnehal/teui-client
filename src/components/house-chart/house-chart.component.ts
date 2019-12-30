import { Component, OnInit, ViewEncapsulation, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'app-house-chart',
  templateUrl: './house-chart.component.html',
  styleUrls: ['./house-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HouseChartComponent implements OnInit,OnChanges {
  @Input() value:number;
  constructor() { }
  ngOnChanges(changes: SimpleChanges) {
    this.value = changes.value.currentValue;
    this.drawSvg(this.value>600?600:this.value,true);
  }
  ngOnInit() {  
    this.drawSvg(this.value>600?600:this.value,false);
  }
 
  drawSvg(value:number,change:boolean){
    var svgWidth =380,svgHeigth=440;
    
    var svg = d3.select("svg").attr("width",svgWidth).attr("height",svgHeigth).attr("class","svg-container")
    
    const values =[{value: 600, key:'Worst Performance'},{value: 200, key:'Canadian Average'},{value: 180, key:'Ontario Building Code'},{value: 160, key:'Energuide 80'},{value: 120, key:'R2000'},{value: 15, key:'Passivhaus'}];
    //first line
    svg.append("line")
    .attr("x1",100)
    .attr("x2",315)
    .attr("y1",10)
    .attr("y2",10)
    .attr("stroke","black")
    .attr("stroke-width","3")
    .attr("transform", "translate(96,-14) rotate(40)")
    //second line
    svg.append("line")
    .attr("x1",100)
    .attr("x2",315)
    .attr("y1",10)
    .attr("y2",10)
    .attr("stroke","black")
    .attr("stroke-width","3")
    .attr("transform", "translate(250,0) rotate(140)")
    //third line
    svg.append("line")
    .attr("x1",100)
    .attr("x2",430)
    .attr("y1",50)
    .attr("y2",50)
    .attr("stroke","black")
    .attr("stroke-width","3")
    .attr("transform", "translate(-100,383) rotate(0)") 
    //fourth line
    svg.append("line")
    .attr("x1",161)
    .attr("x2",400)
    .attr("y1",50)
    .attr("y2",50)
    .attr("stroke","black")
    .attr("stroke-width","3")
    .attr("transform", "translate(380,33) rotate(90)") 
    //fifth line
    svg.append("line")
    .attr("x1",161)
    .attr("x2",400)
    .attr("y1",50)
    .attr("y2",50)
    .attr("stroke","black")
    .attr("stroke-width","3")
    .attr("transform", "translate(51,33) rotate(90)") 
    
    var scale = d3.scaleLinear()
    .domain([0,d3.max(values.map(({value}) => value))+100])
    .range([0,330])
    
    var text = svg.selectAll("text")
    .data(values)
    .enter()
    .append("text");
    text
    .attr("x", function(d) { return 160; })
    .attr("y", function(d) { return scale(-d.value); })
    .text( function (d) { return d.key })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("text-align",'right')
    .attr("fill", "grey")
    .attr("transform", "translate(15,104)  rotate(90)") 
    
    svg.append("text")
    .attr("x", function(d) { return 80})
    .attr("y", 195)
    .text( function (d) { return "This House"})
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .attr("font-weight", "bold")
    if(change){
      d3.select("#teuiValue").text((d) =>{ return this.value.toFixed(2)});
    }else{
      svg.append("text")
      .attr("x", function(d) { return 90})
      .attr("y", 223)
      .attr("id","teuiValue")
      .text((d) =>{ return this.value.toFixed(2)})
      .attr("font-family", "sans-serif")
      .attr("font-size", "30px")
      .attr("fill", "black")
      .attr("font-weight", "bold")
    }
    svg.append("text")
    .attr("x", function(d) { return 80})
    .attr("y", 241)
    .text( function (d) { return "kWh/m2*yr"})
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .attr("font-weight", "bold")

    
    d3.select('#svg-arrow')
    .attr("x1",100)
    .attr("x2",280)
    .attr("y1",200)
    .attr("y2",200)
    .attr("transform", `translate(${scale(value-363 )})`) 
    if(change){
      d3.select('#line line').attr("x1",100)
      .attr("x2",285)
      .attr("y1",50)
      .attr("y2",50)
      .attr("stroke","grey")
      .attr("stroke-width","1")
      .attr("transform", `translate(${scale(value+167)},0) rotate(90)`) 
    }else{
      d3.select('#line').attr('width',330).attr('height','100%').append("line")
      .attr("x1",100)
      .attr("x2",285)
      .attr("y1",50)
      .attr("y2",50)
      .attr("stroke","grey")
      .attr("stroke-width","1")
      .attr("transform", `translate(${scale(value+167)},0) rotate(90)`) 
    }
    
    
   
    // .attr('x', 50)
  }

}
