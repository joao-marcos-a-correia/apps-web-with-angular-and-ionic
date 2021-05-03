import { AfterViewInit, Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

declare let Chart: any;

@Component({
  selector: 'app-monthly-sales-chart',
  templateUrl: './monthly-sales-chart.component.html',
  styleUrls: ['./monthly-sales-chart.component.scss'],
})
export class MonthlySalesChartComponent implements AfterViewInit {
  public data: any = null;

  constructor(
    private service: DataService
  ) { }
  ngAfterViewInit() {
    this.service
      .getMonthlySalesChartData()
      .subscribe((res) => {
        this.data = res;
        this.render();
      });
  }

  render() {
    const el: any = document.getElementById('myChart');
    const ctx = el.getContext('2d');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: this.data,
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  }
}
