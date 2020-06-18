import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { UIChart } from "primeng/chart";

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @ViewChild( "chart" )
    public chart: UIChart;
  @Input() skillsData: any;

  public data;
  public chartData = [];
  public overallData = 
  { 
    labels: [],
    datasets: [
      {
        label: 'Overall Skills',        
        backgroundColor: '#f080807a',
        borderColor: 'lightcoral',
        pointBackgroundColor: 'rgba(179,181,198,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(179,181,198,1)',
        data: []        
      }
    ]    
  };
  public dataReady = false;

  constructor() {
    
   }

  ngOnInit(): void {
    this.prepareChartData(this.skillsData);
    this.data = this.overallData;
  }

  public prepareChartData(categories: any[]) 
  {
    this.chartData = [];
    categories.forEach( (category:any) => {
      this.overallData.labels.push(category.name);
      let category_weight = 0;
      let labels = [];
      let data = [];
      let backgroundColor = ["#FF6384","#4BC0C0","#FFCE56","#E7E9ED","#36A2EB", "#E7E9ED"];
      category.abilities.forEach( ability => { 
        category_weight+= ability.weight? parseInt(ability.weight) : 0;
        labels.push(ability.name);        
        data.push(parseInt(ability.weight));
      });
      this.overallData.datasets[0].data.push(category_weight);
      let datasets = [{ data: data, backgroundColor:backgroundColor , label: category.name }];
      let d = { datasets, labels };
      this.chartData.push(d);
    });
    this.dataReady = true;
  }

  public showChart(i) {
    if(i<0){
      this.data = this.overallData;
      this.chart.type = 'radar';
    }else{
      this.data = this.chartData[i];
      this.chart.type = 'doughnut';
    }
  }

}
