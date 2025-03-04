import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';
import { InputNumber } from 'primeng/inputnumber';

@NgModule({
  declarations: [],
  imports: [CommonModule, InputNumberModule, FormsModule],
  exports: [InputNumberModule, FormsModule, InputNumber],
})
export class PrimeNgModuleModule {}
