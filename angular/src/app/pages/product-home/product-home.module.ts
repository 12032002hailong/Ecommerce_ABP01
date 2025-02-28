import { NgModule } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'primeng/api';
import { TeduSharedModule } from 'src/app/shared/modules/tedu-shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ProductHomeRoutingModule } from './product-home-routing.module';

@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ProductHomeRoutingModule,
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
    ReactiveFormsModule,
    CommonModule,
    InputNumberModule,
  ],
})
export class ProductHomeModule {}
