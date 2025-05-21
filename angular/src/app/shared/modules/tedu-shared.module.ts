import { CoreModule } from '@abp/ng.core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ValidationMessageComponent } from './validation-message/validation-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CoreModule, CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [ValidationMessageComponent],
  exports: [ValidationMessageComponent],
})
export class TeduSharedModule {}
