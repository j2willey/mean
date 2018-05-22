import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Belt 2 app';
  constructor(private _httpService: HttpService){}
}
