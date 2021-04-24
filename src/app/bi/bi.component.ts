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
import { Router } from '@angular/router';


export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
};


@Component({
  selector: 'app-bi',
  templateUrl: './bi.component.html',
  styleUrls: ['./bi.component.css']
})

export class BiComponent implements OnInit {

  annéeOuverture: any;
  annees: any;
  allHistory: any;
  transactions: any;
  relativeRevenue: any;
  total: any;
  headers: any;
  annee: any;
  hidden: any;
  taxes: any;

  dateFin: any;
  dateDebut: any;
  category: any;
  type: any;
  revenue: any;
  margin: any;
  sale: boolean;

  filters = new FormGroup({
    category: new FormControl(''),
    type: new FormControl(''),
    sale: new FormControl(''),
    dateDebut: new FormControl(null, [
      Validators.required
    ]),
    dateFin: new FormControl(null, [
      Validators.required
    ])
  });

  monthTmp: any;
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  displayAble: boolean;
  myYearButton: boolean;
  nbrSeconde: number;
  myYearClicked: any;
  constructor(public biService: BiService, private fb: FormBuilder, public router: Router) {
    this.annéeOuverture = "2018";
    this.allHistory = [];
    this.transactions = [];
    this.relativeRevenue = [];
    this.headers = ["Date", "Nom", "Quantité", "Type transaction", "Gain", "Perte"];
    this.displayAble = false;
    this.category = "";
    this.type = "";
    this.headers = ["Date", "Nom", "Quantité", "Type transaction", "Gain", "Perte"]

    this.monthTmp = [];

    this.myYearButton = false
    this.nbrSeconde = 9

    this.annees = this.getYears(this.annéeOuverture);
    this.hidden = true;
    this.annee = 0;
    this.taxes = "";

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
        formatter: function (val) {
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
      }
    }
  }

  ngOnInit(): void {
    this.biService.getInfoAllHistory().subscribe(data => {
      this.allHistory = data["transactions"];
      this.relativeRevenue = data["relative revenue"];
    },
      (err) => {
        alert('failed');
        this.router.navigate(['/home']);
      });



  }

  setYear(year) {
    for (let i = 0; i < 12; i++) {
      let request = this.biService.getInfoHistoryByDate(this.convertToTimeStamp(year, i + 1), this.convertToTimeStamp(year, i + 2))
      this.biService.getInfosFiltered(request + "&revenue=true").subscribe(
        data => {
          this.monthTmp[i] = data["relative revenue"]
        },
        (err) => {
          this.monthTmp[i] = {
            "turnover": 0,
            "margin": 0
          }
        }
      );

    }
  }
  setValueGraph(annee) {
    this.myYearButton = true
    this.myYearClicked = annee;
    this.setYear(annee);
    setTimeout(() => {
      this.chartOptions.series = [{
        data: []
      }]
      this.chartOptions.series = [{
        data: [this.monthTmp[0].margin,
        this.monthTmp[1].margin,
        this.monthTmp[2].margin,
        this.monthTmp[3].margin,
        this.monthTmp[4].margin,
        this.monthTmp[5].margin,
        this.monthTmp[6].margin,
        this.monthTmp[7].margin,
        this.monthTmp[8].margin,
        this.monthTmp[9].margin,
        this.monthTmp[10].margin,
        this.monthTmp[11].margin]
      }]
      this.myYearButton = false
    }, 9000);
   
    setTimeout(() => {
      this.nbrSeconde = 8
    }, 1000)
    setTimeout(() => {
      this.nbrSeconde = 7
    }, 2000)
    setTimeout(() => {
      this.nbrSeconde = 6
    }, 3000)
    setTimeout(() => {
      this.nbrSeconde = 5
    }, 4000)
    setTimeout(() => {
      this.nbrSeconde = 4
    }, 5000)
    setTimeout(() => {
      this.nbrSeconde = 3
    }, 6000)
    setTimeout(() => {
      this.nbrSeconde = 2
    }, 7000)
    setTimeout(() => {
      this.nbrSeconde = 1
    }, 8000)
    setTimeout(() => {
      this.nbrSeconde = 9
    }, 9000)
    
    
  }

  convertTimeStamp(timeStamp): String {
    var date = new Date(timeStamp * 1000);
    return (date.getDate()) + "-" + (date.getMonth() + 1) + "-" + date.getFullYear() + "-" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }

  checkTypeC(timeStamp): String {
    if (timeStamp.type == 'A') {
      return timeStamp.totalPrice
    }
    else
      return '0';
  }

  checkTypeD(timeStamp): String {
    if (timeStamp.type == 'RPV') {
      return timeStamp.totalPrice
    }
    else
      return '0';
  }

  convertToTimeStamp(annee, mois): String {
    let date = "";
    if (mois < 10)
      date = annee.toString() + "-0" + mois.toString() + "-01"
    else
      if (mois <= 12)
        date = annee.toString() + "-" + mois.toString() + "-01"
      else
        date = annee.toString() + "-12-31"
    return date;
  }

  submitForm() {
    let request = this.biService.getInfoHistoryByDate(this.dateDebut, this.dateFin);
    if (Date.parse(this.dateDebut) - Date.parse(this.dateFin) > 0) {
      alert("La date de fin ne peut être antérieur à la date de début");
      return null;
    }
    if (this.category != "") {
      request = request + this.biService.getInfoHistoryByCategory(this.category);
      if (this.category != 'COQ' && this.category != 'CRU' && this.category != 'POI') {
        alert("Uniquement POI(ssons) / CRU(stacés) / COQ(uillages) sont valides");
        return null;
      }
    }
    if (this.type != "") {
      request = request + this.biService.getInfoHistoryByType(this.type);
      if (this.type != 'A' && this.type != 'RPV' && this.type != 'RPI') {
        alert("Uniquement A (ajouts) / RPI (retraits par invendus) / RPV (retraits par ventes) sont valides");
        return null;
      }
    }
    if (this.sale) {
      request = request + this.biService.getInfoHistoryBySale();
    }
    request = request + "&revenue=true"
    this.biService.getInfosFiltered(request).subscribe(data => {
      this.transactions = data["transactions"];
      this.relativeRevenue = data["relative revenue"];
    },
      (err) => {
        alert('failed');
      });
    this.displayAble = true;
  }

  getCategory() {
    return this.filters.get('category');
  }

  getType() {
    return this.filters.get('type');
  }

  getYears(debut) {
    var now = new Date(Date.now());
    var actualYear = now.getFullYear();
    var data = [];
    for (var i = parseInt(debut); i <= actualYear; i++) {
      data[i - debut] = i;
    }
    return data;
  }

  afficherAnnee(year) {
    this.hidden = false;
    return this.biService.getInfoTaxesByYear(year).subscribe(data => {
      this.taxes = data["taxes"];
    },
      (err) => {
        alert('failed');
      });
  }
}
