import { HomeComponent } from './home/home.component';
import { NewComponent } from './new/new.component';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'pets',component: HomeComponent },
  { path: 'pets/new',component: NewComponent },
  { path: 'pets/:id',component: DisplayComponent },
  { path: 'pets/:id/edit',component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

