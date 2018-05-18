import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private _http: HttpClient) { }

  getPets(){
    console.log("getPets:");
    return this._http.get('/pets/all');
  }

  createPet(data){
    console.log("httpService: createPet:", data);
    return this._http.post('/pets/new', data);
  }

  getPet(id) {
    console.log("getPet:", id);  
    return this._http.get('/pets/get/' + id);
  }
   
 
  updatePet(id, data) {
    console.log("updatePet:", data);  
    return this._http.put('/pets/' + id, data);
  }
   
  deletePet(id) {
    console.log("deletePet:");  
    return this._http.delete('/pets/' + id);
  }
}

