import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getMovies(){
    console.log("getMovies:");
    return this._http.get('/moovies');
  }

  addMovie(data){
    console.log("httpService: createMovie:", data);
    return this._http.post('/moovies/new', data);
  }

  getMovie(id) {
    console.log("getMovie:", id);  
    return this._http.get('/moovies/' + id);
  }
   
 
  updateMovie(id, data) {
    console.log("updateMovie:", data);  
    return this._http.put('/moovies/' + id, data);
  }
   
  deleteMovie(id) {
    console.log("deleteMovie:");  
    return this._http.delete('/moovies/' + id);
  }

  deleteReview(mid, rid) {
    console.log("deleteMovie:");  
    return this._http.delete('/moovies/' + mid + '/review/' + rid);
  }

}
