import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pets = [];
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getPets()
  }

  getPets() {
    let observable = this._httpService.getPets();
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Got our pets in the component!", data);
      if ( 'pets' in data ) {
        console.log("got some pets")
        this.pets = data['pets'];
      }
      console.log(this.pets);
    });    
  }
}
