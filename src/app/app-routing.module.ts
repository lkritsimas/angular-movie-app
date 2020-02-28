import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';

const routes: Routes = [
  { path: 'movies', redirectTo: '/movies/upcoming', pathMatch: 'full' },
  { path: 'movies/upcoming', component: MoviesComponent },
  { path: 'movies/popular', component: MoviesComponent },
  { path: 'title/:id', component: MovieDetailComponent },
  { path: '', redirectTo: '/movies/upcoming', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
