import { Component, OnInit, Input } from '@angular/core';
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
  title: string = '';

  constructor(location: Location, private movieService: MovieService) {
    this.movies = this.movieService.result;
    this.path = location.path()
  }

  ngOnInit(): void {
    const pathParts = this.path.split("/");
    const currPath = pathParts[pathParts.length - 1];

    switch (currPath) {
      case 'popular':
        return this.getPopularMovies();
      case 'top':
        return this.getTopRatedMovies();
      case 'upcoming':
        return this.getUpcomingMovies();
      default:
        break;
    }
  }

  getUpcomingMovies(): void {
    this.title = 'Upcoming movies';
    this.movieService.getUpcomingMovies();
  }

  getPopularMovies(): void {
    this.title = 'Popular movies';
    this.movieService.discoverMovies({
      'sort_by': 'popularity.desc'
    });
  }

  getTopRatedMovies(): void {
    this.title = 'Top rated movies';
    this.movieService.getTopRatedMovies();
  }
}
