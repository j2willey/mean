import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  pet : any;

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router
              ) { }

  ngOnInit() {
    this.pet = {name:"", description:"", type:"", skills:[], likes:0}
    this._route.params.subscribe((params: Params) => {console.log(params['id']);
      this.getPet(params['id']); });
  }

  getPet(id) {
    let observable = this._httpService.getPet(id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Got our pets in the component!", data);
      if ( 'pet' in data ) {
        console.log("got a pet")
        this.pet = data['pet'][0];
      }
      console.log(this.pet);
    });    
  }
  adoptPet(id) {
    console.log("adopt pet: ", id)
    let observable = this._httpService.deletePet(id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Adopted pet in the component!", data);
      this.pet = {name:"", description:"", type:"", skills:[], likes:0}
      console.log(this.pet);
    });    
  }
}
