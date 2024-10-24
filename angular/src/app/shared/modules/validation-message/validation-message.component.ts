import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-validation-message',
  templateUrl: './validation-message.component.html',
})
export class ValidationMessageComponent implements OnInit {
  @Input() entityForm: FormGroup;
  @Input() fileName: string;
  @Input() validationMessages: any;

  constructor() {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
}
