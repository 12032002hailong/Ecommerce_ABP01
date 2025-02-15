import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductHomeComponent } from '../pages/product-home/product-home.component';

@NgModule({
  declarations: [HomeComponent],
  imports: [SharedModule, HomeRoutingModule, CarouselModule, ProductHomeComponent],
})
export class HomeModule {
  ProductHomeComponent;
}
