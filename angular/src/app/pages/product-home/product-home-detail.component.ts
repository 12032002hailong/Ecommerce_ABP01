import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-home-detail.component.html',
  styleUrl: './product-home-detail.component.scss',
})
export class ProductHomeDetailComponent {
  days: any = 194;
  hours: number = 22;
  mins: number = 14;
  secs: number = 4;

  constructor() {}

  x = setInterval(() => {
    let futureDate = new Date('Jan 4, 2026 15:34:24').getTime();
    let today = new Date().getTime();
    let distance = futureDate - today;
    this.days = Math.floor(distance / (1000 * 60 * 60 * 24));
    this.hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    this.mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    this.secs = Math.floor((distance % (1000 * 60)) / 1000);
    if (distance < 0) {
      clearInterval(this.x);
      this.days = 'Offer is expired';
    }
  }, 1000);
}
