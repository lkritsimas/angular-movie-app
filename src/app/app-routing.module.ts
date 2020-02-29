import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SearchResultComponent } from './search-result/search-result.component';

const routes: Routes = [
  { path: 'movies/upcoming', component: MoviesComponent },
  { path: 'movies/popular', component: MoviesComponent },
  { path: 'movies', redirectTo: '/movies/upcoming', pathMatch: 'full' },
  { path: 'title/:id', component: MovieDetailComponent },
  { path: 'search/:term', component: SearchResultComponent },
  { path: 'search', component: SearchResultComponent },
  { path: '', redirectTo: '/movies/upcoming', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
