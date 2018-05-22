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
  liked : boolean;
  errors : string;

  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router
              ) {}

  ngOnInit() {
    this.pet = {name:"", description:"", type:"", skills:[], likes:0}
    this.liked = false;
    this.errors = "";
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
      this._router.navigate(['/pets']);                
    });    
  }

  likePet() {
    if (! this.liked) {
      this.liked = true;
      console.log("Like this Pet!", this.pet);
      this.pet.likes++;
      let observable = this._httpService.updatePet(this.pet._id, this.pet);
      // subscribe to the Observable and provide the code we would like to do with our data from the response
      observable.subscribe(data => { 
        if ( 'error' in data) {
          this.errors = data['error'];
        } else {
          this.errors = null;
        }
        console.log("Updated new Pet!", data);
      });          
    } else {
      console.log("Already Liked this Pet!", this.pet);
    }
  }

}
