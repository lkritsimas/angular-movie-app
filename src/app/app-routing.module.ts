import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MoviesComponent } from './movies/movies.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { DiscoverComponent } from './discover/discover.component';

const routes: Routes = [
  { path: 'movies/popular', component: MoviesComponent, data: { title: 'Popular movies' } },
  { path: 'movies/top', component: MoviesComponent, data: { title: 'Top rated movies' } },
  { path: 'movies/upcoming', component: MoviesComponent, data: { title: 'Upcoming movies' } },
  { path: 'movies', redirectTo: '/movies/popular', pathMatch: 'full' },
  { path: 'discover', component: DiscoverComponent, data: { title: 'Discover movies' } },
  { path: 'title/:id', component: MovieDetailComponent },
  { path: 'search/:term', component: SearchResultComponent, data: { title: 'Search' } },
  { path: 'search', component: SearchResultComponent, data: { title: 'Search' } },
  { path: '', redirectTo: '/movies/popular', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
