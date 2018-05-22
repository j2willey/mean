import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  movie : any;
  errors : string;
  constructor(private _httpService: HttpService,
              private _route:       ActivatedRoute,
              private _router:      Router
  ) { }
  
  ngOnInit() {
    this.movie = {title:"", avgRating: 0, reviews: [{username:"",  review:"", rating:0}]};
    this.errors = null;
    console.log("new ngOnInit")

  }
  
  addMovie() {
    this.movie.avgRating = this.movie.reviews[0].rating;
    console.log("Add new movie!", this.movie);
    let observable = this._httpService.addMovie(this.movie);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      if ( 'error' in data) {
        this.errors = data['error'];
      } else {
        this.errors = null;        
        this._router.navigate(['/movies']);                
      }
      console.log("Added new Movie and Review!", data);
    });    
  }
}
