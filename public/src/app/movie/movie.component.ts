import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {
  movie : any;
  errors : string;

  constructor(private _httpService: HttpService,
              private _route:       ActivatedRoute,
              private _router:      Router) { }

  ngOnInit() {
    this.movie = { title : "", avgRating : 0, reviews:[]}
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

  deleteMovie(id) {
    console.log("delete Movie: ", id)
    let observable = this._httpService.deleteMovie(id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Deleted movie in the component!", data);
      //this.pet = {name:"", description:"", type:"", skills:[], likes:0}
      console.log(this.movie);
      this._router.navigate(['/movies']);                
    });    
  }

}
