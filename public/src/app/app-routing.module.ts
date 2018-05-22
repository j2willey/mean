import { MoviesComponent } from './movies/movies.component';
import { NewComponent } from './new/new.component';
import { MovieComponent } from './movie/movie.component';
import { ReviewComponent } from './review/review.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'movies',component: MoviesComponent },
  { path: 'movies/new',component: NewComponent },
  { path: 'movies/:id',component: MovieComponent },
  { path: 'movies/:id/review',component: ReviewComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
