import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input() messages: string[];
  @Input() name: string;
  @Input() closeHandler: (name: string) => {};

  constructor() { }

  ngOnInit() {
  }

}
