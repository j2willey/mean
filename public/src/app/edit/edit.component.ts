import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  pet: any;
  skill1 : string;
  skill2 : string;
  skill3 : string;
  errors : string;
  constructor(private _httpService: HttpService,
              private _route: ActivatedRoute,
              private _router: Router
              ) { }
          
  ngOnInit() {
    this.pet = {name:"", type: "", description:"", skills:[]};
    this.skill1 = "";
    this.skill2 = "";
    this.skill3 = "";
    this.errors = null;
    this.pet = {name:"", description:"", type:"", skills:[], likes:0}
    this._route.params.subscribe((params: Params) => {console.log(params['id']);
      this.getPet(params['id']); 
    });
  }

  getPet(id) {
    let observable = this._httpService.getPet(id);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      console.log("Got our pets in the component!", data);
      if ( 'pet' in data ) {
        this.pet = data['pet'][0];
        console.log("got a pet", this.pet)
        console.log(this.pet.skills[0], this.pet.skills.length)
        this.skill1 = (this.pet.skills.length > 0 )? this.pet.skills[0] : "";
        this.skill2 = (this.pet.skills.length > 1 )? this.pet.skills[1] : "";
        this.skill3 = (this.pet.skills.length > 2 )? this.pet.skills[2] : "";
      }
      console.log(this.pet);
    });    
  }

  likePet() {
    console.log("like Pet:")
    this.pet.likes++;
    this.updatePet();
  }

  updatePet() {
    this.pet.skills = [];
    if (this.skill1 != "") {
      this.pet.skills.push(this.skill1);
    }
    if (this.skill2 != "") {
      this.pet.skills.push(this.skill2);
    }
    if (this.skill3 != "") {
      this.pet.skills.push(this.skill3);
    }
    console.log("Update new Pet!", this.pet);
    let observable = this._httpService.updatePet(this.pet._id, this.pet);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      if ( 'error' in data) {
        this.errors = data['error'];
      } else {
        this.errors = null;
        this._router.navigate(['/pets']);                
      }
      console.log("Updated new Pet!", data);
    });    
  }

}
