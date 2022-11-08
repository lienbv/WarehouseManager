import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from "@angular/forms";
import {DatePipe, formatDate} from "@angular/common";
import {OrderService} from "../service/order.service";
import {IOrder} from "../interface-entity/IOrder";

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexYAxis,
  ApexTooltip,
  ApexMarkers,
  ApexXAxis,
  ApexPlotOptions,
  ApexTitleSubtitle
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis | ApexYAxis[];
  labels: string[];
  stroke: any; // ApexStroke;
  markers: ApexMarkers;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  pastDay = this.datePipe.transform(new Date().setDate(new Date().getDate() - 365), 'dd/MM/yyyy');
  today = this.datePipe.transform(new Date(), 'dd/MM/yyyy');

  @ViewChild('chart') chart!: ChartComponent|any;
  public chartOptions: Partial<ChartOptions>|any;
  checkDateForm!: FormGroup;
  isCheckStatistic = false;
  checkStartDate = this.pastDay;
  checkEndDate = this.today;
  check = false;
  startDate!: string;
  endDate!: string;
  totalMoney = 0;
  label: string[] = [];
  totalPay: number[] = [];
  interestMoney: number[] = [];
  expectedMoney: number[] = [];
  orders: IOrder[] = [];
  char: any;
  constructor(private datePipe: DatePipe, private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.checkDateForm = new FormGroup({
      checkStartDate: new FormControl('', [Validators.required]),
      checkEndDate: new FormControl('',[Validators.required])
    }, this.checkDate);
  }
  private checkDate(check: AbstractControl): any {
    const fromDate = check.get('checkStartDate');
    const toDate = check.get('checkEndDate');
    // @ts-ignore
    return fromDate.value <= toDate.value ? null : {errorDateTo: true};
  }
  getStatistic() {
    this.check = true;
    this.isCheckStatistic = true;
    if (this.isCheckStatistic) {
      this.label = [];
      this.totalPay = [];
      this.expectedMoney = [];
      this.interestMoney = [];
      this.totalMoney = 0;
      this.startDate = formatDate(this.checkDateForm.controls.checkStartDate.value, 'dd/MM/yyyy', 'en-US');
      this.endDate = formatDate(this.checkDateForm.controls.checkEndDate.value, 'dd/MM/yyyy', 'en-US');
      this.getInterestDay()
    }
  }

  private getInterestDay() {
    this.orderService.getListStatistic(this.startDate, this.endDate).subscribe((data) => {
      this.orders = data;
      let month = new Date(this.orders[0].orderDate);
      let tempMoney = 0;
      for (let i = 0; i < this.orders.length; i++) {
        this.totalMoney += this.orders[i].total;
        let startMonth = new Date(this.orders[i].orderDate);
        if (month.getMonth() == startMonth.getMonth()) {
          tempMoney += this.orders[i].total;
        } else {
          this.totalPay.push(tempMoney);
          this.label.push("Tháng" + (month.getMonth() + 1));
          tempMoney = this.orders[i].total;
          month = startMonth;
        }
      }
      this.totalPay.push(tempMoney);
      this.label.push("Tháng" + (month.getMonth() + 1));
      this.statisticExected();
    })
  }
  numToString(num: number) {
    return num.toLocaleString().split(',').join(this.char || '.');
  }
  private statisticExected() {

    this.chartOptions = {
      series: [
        {
          name: "Tiền Lãi",
          color: '#009900',
          type: 'column',
          data: this.totalPay
        }
      ],
      chart: {
        height: 350,
        type: 'line',
        stacked: false
      },
      stroke: {
        width: [0, 2, 5],
        curve: 'smooth'
      },
      plotOptions: {
        bar: {
          columnWidth: '50%'
        }
      },

      fill: {
        opacity: [0.85, 0.25, 1],
        gradient: {
          inverseColors: false,
          shade: 'light',
          type: 'vertical',
          opacityFrom: 0.85,
          opacityTo: 0.55,
          stops: [0, 100, 100, 100]
        }
      },
      xaxis: {
        labels: {
          trim: false
        },
        categories: this.label
      },
      labels: [''],

      markers: {
        size: 0
      },
      yaxis: {
        title: {
          text: 'VND'
        },
        min: 0
      },
      tooltip: {
        shared: true,
        intersect: false,
        y: {
          formatter(y: any) {
            if (typeof y !== 'undefined') {
              return y.toFixed(0) + ' VND';
            }
            return y;
          }
        }
      }
    };
  }
}
