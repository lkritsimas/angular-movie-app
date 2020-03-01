import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Location } from "@angular/common";
import { Observable } from 'rxjs';

import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: Observable<any>;
  path: string;
  prevPath: string;
  title: string = '';
  currPath: string;
  fetchType: string = '';
  prevFetchType: string = '';

  constructor(location: Location, private movieService: MovieService) {
    this.movies = this.movieService.result;
    this.path = location.path();
  }

  ngOnInit(): void {
    const pathParts = this.path.split("/");
    this.currPath = pathParts[pathParts.length - 1];
    this.fetchMovies();
  }

  fetchMovies() {
    // Get fetch type
    this.movieService.prevFetchType = this.movieService.fetchType;
    this.movieService.fetchType = this.currPath;

    // Clear movies if page has changed
    if (this.movieService.fetchType !== this.movieService.prevFetchType)
      this.movieService.clear();

    switch (this.currPath) {
      case 'popular':
        this.getPopularMovies();
        break;
      case 'top':
        this.getTopRatedMovies();
        break;
      case 'upcoming':
        this.getUpcomingMovies();
        break;
      default:
        break;
    }

  }

  onScroll(): void {
    this.fetchMovies();
  }

  getUpcomingMovies(): void {
    this.title = 'Upcoming movies';
    this.movieService.getUpcomingMovies(this.movieService.getPage());
  }

  getPopularMovies(): void {
    this.title = 'Popular movies';
    this.movieService.discoverMovies(
      {
        'sort_by': 'popularity.desc'
      },
      this.movieService.getPage()
    );
  }

  getTopRatedMovies(): void {
    this.title = 'Top rated movies';
    this.movieService.getTopRatedMovies(this.movieService.getPage());
  }
}
