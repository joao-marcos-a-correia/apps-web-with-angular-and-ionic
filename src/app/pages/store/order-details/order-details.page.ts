import { StatusUtil } from './../../../utils/status.utils';
import { SecurityUtil } from 'src/app/utils/security.util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

  public order: any = null;
  constructor(
    private route: ActivatedRoute,
    private service: DataService
  ) { }

  ngOnInit() {
    const number = this.route.snapshot.paramMap.get('number');

    this.service
      .getOrder(number)
      .subscribe((data) => {
        this.order = data;
      });
  }

  isManager(): boolean {
    return SecurityUtil.isInRole('manager');
  }

  translateOrderStatus(status: string): string {
    return StatusUtil.convert(status);
  }
}
