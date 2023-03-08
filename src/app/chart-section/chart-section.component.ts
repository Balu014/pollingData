import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { PollingService} from '../service/polling.service'
import ChartDataLabels from 'chartjs-plugin-datalabels';
Chart.register(...registerables)

@Component({
  selector: 'app-chart-section',
  templateUrl: './chart-section.component.html',
  styleUrls: ['./chart-section.component.css']
})
export class ChartSectionComponent implements OnInit {

  constructor( private pollService : PollingService) { }
  labels =[['LAKSHMI',467606],[ 'radha', 67890], ['Anusha',12345],[ 'sara', 2076140],[ 'sudha', 90251],[ 'jaya',773195],['priya', 918258],[ 'riya', 112233],[ 'Vanitha',63204],[ 'Madhu', 955399]];
  data = [12, 6, 4, 4, 3, 3,2, 2, 2, 2]

  chartdata : any;

  labeldata: any[]=[];

  realdata: any[]=[];

  namedata: any[]=[];
 
  info :any;
  ngOnInit(): void {
    this.pollService.getPollingData().subscribe(result =>{
      this.chartdata = result
      if(this.chartdata!=null){
        for(let i=0; i<this.chartdata.length; i++){
          this.labeldata.push([this.chartdata[i].assID , this.chartdata[i].name] );
          this.realdata.push(this.chartdata[i].count)
          
        }
        this.renderChart(this.labeldata, this.realdata, this.namedata );
      }
    })
  }

  

   renderChart(labeldata:any, realdata:any, namedata:any){
    var mychart = new Chart("barchart", {
      type: 'bar',
      data: {
      labels:this.labels, 
      datasets: [{
        label: " ",
        data:this.data,
        backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
      ],
        borderWidth: 1,
        // barPercentage:1,
        // categoryPercentage:1
      }]
    },

   

    plugins: [ChartDataLabels],
    options: {
     
      plugins:{
        legend:{
          display: false,
        }
      },
      scales: {
        y: {
          beginAtZero: true
        },
       
      }
    }
  });
  
  
  }
 
}
