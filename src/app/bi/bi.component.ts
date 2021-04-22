import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BiService } from '../services/bi.service';
import { filter, map } from "rxjs/operators";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-bi',
  templateUrl: './bi.component.html',
  styleUrls: ['./bi.component.css']
})
export class BiComponent implements OnInit {

  allHistory: any;
  transactions: any;
  total: any;
  headers: any;
  dateFin: any;
  dateDebut: any;
  category : any;
  type : any;
  filters = new FormGroup({
    category: new FormControl(''),
    type: new FormControl(''),
    dateDebut : new FormControl(null, [
      Validators.required
  ]),
    dateFin : new FormControl(null, [
      Validators.required
  ])
 });

 monthTmp: any;
 janvier; fevrier; mars; avril; mai; juin; juillet; aout; septembre; octobre; novembre; decembre;
 @ViewChild("chart") chart: ChartComponent;
 public chartOptions: Partial<ChartOptions>;


  constructor(public biService : BiService, private fb: FormBuilder) {
      this.allHistory = [];
      this.transactions =[];
      this.headers = ["Date","Nom","Quantité","Type transaction","Gain","Perte"]
      this.monthTmp = [this.janvier, this.fevrier, this.mars, this.avril, this.mai, this.juin, this.juillet, this.aout, this.septembre, this.octobre, this.novembre, this.decembre];

      this.chartOptions = {
        series: [
          {
            data: []
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            dataLabels: {
              position: "top" // top, center, bottom
            }
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function(val) {
            return val + "€";
          },
          offsetY: -20,
          style: {
            fontSize: "12px",
            colors: ["#304758"]
          }
        },
  
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          position: "top",
          labels: {
            offsetY: -10
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "light",
            type: "horizontal",
            shadeIntensity: 0.25,
            gradientToColors: undefined,
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [50, 0, 100, 100]
          }
        },
        
        title: {
          text: "Revenu mensuel, 2020",
          offsetY: 320,
          align: "center",
          style: {
            color: "#444"
          }
        }
  }}

  ngOnInit(): void {
    this.biService.getInfoAllHistory().subscribe(data => {
      this.allHistory = data;
      this.transactions = data["transactions"];
    },
    (err) => {
      alert('failed');
    });
    
    
    
  }

  setYear(year){

    for(let i = 0; i<12; i++){
      let debut = this.convertToTimeStamp(year, i+1)
      let fin = this.convertToTimeStamp(year, i+2)
      this.biService.getInfoHistoryByDate(debut,fin).subscribe(
        data => {
          this.monthTmp[i] = data["relative revenue"]
          
    },
    (err) => {
            this.monthTmp[i] = {
              "turnover": 0,
              "margin": 0
            }
            
        }
  
)
    }
  }
   setValueGraph(annee){
     this.setYear(annee)
     this.chartOptions.series = [{
      data: []
    }]
      this.chartOptions.series = [{
        data: [this.monthTmp[0].margin,this.monthTmp[1].margin,this.monthTmp[2].margin,this.monthTmp[3].margin,this.monthTmp[4].margin,this.monthTmp[5].margin,this.monthTmp[6].margin,this.monthTmp[7].margin,this.monthTmp[8].margin,this.monthTmp[9].margin,this.monthTmp[10].margin,this.monthTmp[11].margin]
      }]
      
  }

  convertTimeStamp(timeStamp): String {
    var date = new Date(timeStamp*1000);
    return (date.getDate())+"-"+(date.getMonth()+1)+"-"+date.getFullYear()+"-"+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
  }

  checkTypeC(timeStamp): String {
    if(timeStamp.type == 'A'){
      return timeStamp.totalPrice
    }
    else 
      return '0';
  }

  checkTypeD(timeStamp): String {
    if(timeStamp.type == 'RPV'){
      return timeStamp.totalPrice
    }
    else 
      return '0';
  }

  convertToTimeStamp(annee, mois): number {
    let date = "";
    if(mois < 10)
      date = annee.toString() + "-0" + mois.toString() + "-01"
    else
      if (mois <= 12)
        date = annee.toString() + "-" + mois.toString() + "-01"
      else
      date = annee.toString() + "-12-31"
    console.log(date)
    return (Date.parse(date)/1000);
  }

  submitForm() {
    if(this.filters.value)
    this.biService.getInfosFiltered
    console.log(this.filters.value)
  }
}