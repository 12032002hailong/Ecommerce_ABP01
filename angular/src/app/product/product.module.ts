import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductRoutingModule } from './product-routing.module';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProductComponent } from './product.component';
import { ProductDetailComponent } from './product-detail.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { TeduSharedModule } from '../shared/modules/tedu-shared.module';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductAttributeComponent } from './product-attribute.component';
import { CalendarModule } from 'primeng/calendar';

@NgModule({
  declarations: [ProductDetailComponent, ProductComponent, ProductAttributeComponent],
  imports: [
    SharedModule,
    ProductRoutingModule,
    PanelModule,
    TableModule,
    PaginatorModule,
    BlockUIModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    ProgressSpinnerModule,
    DynamicDialogModule,
    CheckboxModule,
    EditorModule,
    CalendarModule,
    TeduSharedModule,
    BadgeModule,
    ImageModule,
    ConfirmDialogModule,
  ],
})
export class ProductModule {}
