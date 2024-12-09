import { AuthService } from '@abp/ng.core';
import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}

  partnerArray: any = [
    {
      imgName: 'https://short.com.vn/JRWY',
    },
    {
      imgName: 'https://short.com.vn/4wsX',
    },
    {
      imgName: 'https://s.pro.vn/E00m',
    },
    {
      imgName: 'https://s.pro.vn/8pIZ',
    },
    {
      imgName: 'https://short.com.vn/dadq',
    },
    {
      imgName: 'https://short.com.vn/Vn3n',
    },
  ];

  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  login() {
    this.authService.navigateToLogin();
  }

  changeImage(event: any) {}
}
