import { NgModule } from '@angular/core';
import { CatalogRoutingModule } from './catalog-routing.module';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { BlockUIModule } from 'primeng/blockui';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product/product-detail.component';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { CheckboxModule } from 'primeng/checkbox';
import { EditorModule } from 'primeng/editor';
import { BadgeModule } from 'primeng/badge';
import { ImageModule } from 'primeng/image';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProductAttributeComponent } from './product/product-attribute.component';
import { CalendarModule } from 'primeng/calendar';
import { SharedModule } from 'primeng/api';
import { TeduSharedModule } from 'src/app/shared/modules/tedu-shared.module';
import { AttributeComponent } from './attribute/attribute.component';
import { AttributeDetailComponent } from './attribute/attribute-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { ManufactureComponent } from './manufacture/manufacture.component';
import { CategoryComponent } from './category/category.component';
import { ManufactureDetailComponent } from './manufacture/manufacture-detail.component';
import { ProductCategoryDetailComponent } from './category/category-detail.component';

@NgModule({
  declarations: [
    ProductDetailComponent,
    ProductComponent,
    ProductAttributeComponent,
    AttributeComponent,
    AttributeDetailComponent,
    ManufactureDetailComponent,
    ProductCategoryDetailComponent,
  ],
  imports: [
    SharedModule,
    CatalogRoutingModule,
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
    ManufactureComponent,
    CategoryComponent,
  ],
})
export class CatalogModule {}
