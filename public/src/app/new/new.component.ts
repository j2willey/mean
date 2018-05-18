import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  pet: any;
  skill1 : string;
  skill2 : string;
  skill3 : string;
  errors : string;
  constructor(private _httpService: HttpService) { }

  ngOnInit() {
    this.pet = {name:"", type: "", description:"", skills:[]};
    this.skill1 = "";
    this.skill2 = "";
    this.skill3 = "";
    this.errors = null;
    console.log("Hi Mom")
  }

  createPet() {
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
    console.log("Create new Pet!", this.pet);
    let observable = this._httpService.createPet(this.pet);
    // subscribe to the Observable and provide the code we would like to do with our data from the response
    observable.subscribe(data => { 
      if ( 'error' in data) {
        this.errors = data['error'];
      } else {
        this.errors = null;        
      }
      console.log("Created new Pet!", data);
      this.pet.title = null;
      this.pet.description = null;
    });    
  }

}
