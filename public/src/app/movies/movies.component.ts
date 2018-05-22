import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  movies = [];
  
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.getMovies()
  }

  getMovies() {
    let observable = this._httpService.getMovies();
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Got our Movies in the component!", data);
      if ( 'movies' in data ) {
        console.log("got some movies")
        this.movies = data['movies'];
      }
      console.log(this.movies);
    });    
  }
}
