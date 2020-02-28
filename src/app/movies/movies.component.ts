import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  movies: any;
  path: string;

  constructor(location: Location, private movieService: MovieService) {
    this.path = location.path()
  }
  ngOnInit(): void {
    const pathParts = this.path.split("/");
    const currPath = pathParts[pathParts.length - 1];

    if (currPath === 'popular')
      this.getPopularMovies();
    else if (currPath === 'upcoming' || currPath === '')
      this.getUpcomingMovies();
  }

  getUpcomingMovies(): void {
    this.movieService.getUpcomingMovies().subscribe(movies => {
      this.movies = movies
    });
  }

  getPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe(movies => {
      this.movies = movies
    });
  }
}
