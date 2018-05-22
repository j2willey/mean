import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
  movie : any;
  errors : string;
  review : any;

  constructor(private _httpService: HttpService,
              private _route:       ActivatedRoute,
              private _router:      Router) { }

  ngOnInit() {
    this.movie  = { title : "", avgRating : 0, reviews:[]};
    this.review = {username:"",  review:"", rating:0};
    this._route.params.subscribe((params: Params) => {console.log(params['id']);
    this.getMovie(params['id']); });

  }

  getMovie(id) {
    let observable = this._httpService.getMovie(id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Got our movies in the component!", data);
      if ( 'movies' in data ) {
        console.log("got a movie")
        this.movie = data['movies'][0];
      }
      console.log(this.movie);
    });    
  }

  addReview() {
    console.log("===== Adding a new review =")
    this.errors = "";
    this.movie.reviews.push(this.review);
    var ratSum:number = 0;
    for (var review of this.movie.reviews) {
       ratSum += Number(review.rating);
       console.log("ratSum =", ratSum)
    }
    this.movie.avgRating = ratSum / this.movie.reviews.length;
    console.log("     /this.movie.reviews.length :", this.movie.reviews.length )
    console.log("avgRating =", this.movie.avgRating)
    console.log("Add new movie!", this.movie);
    let observable = this._httpService.updateMovie(this.movie._id, this.movie);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      if ( 'error' in data) {
        this.errors = data['error'];
      } else {
        this.errors = null;        
        this._router.navigate(['/movies/' + this.movie._id]);                
      }
      console.log("Added new Movie and Review!", data);
    });    
  }

}
