/*
import {Component} from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-angular-app';
}
*/

import {Component, OnInit} from '@angular/core'
import {MessageService} from '../services/message.service'

@Component({
  selector: 'simple-message',
  styleUrls: ['./simple-message.component.css'],
  templateUrl: './simple-message.component.html'
})
export class SimpleMessageComponent implements OnInit {
  message: string

  constructor(
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.messageService.getMessage().subscribe(response =>
      this.message = response.message
    )
  }

}
