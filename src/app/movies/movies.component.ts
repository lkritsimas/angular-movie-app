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

    if (currPath === 'popular') {
      this.getPopularMovies();
    } else if (currPath === 'upcoming' || currPath === '') {
      this.getUpcomingMovies();
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
}
