import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from '../../movie.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  genres: any;
  genresFilter: string = '';
  ratingFilter: string = '';
  sortByFilter: string = 'popularity.desc';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovieGenres();
    this.discoverMovies();
  }

  discoverMovies(): void {
    this.movieService.discoverMovies(
      {
        'sort_by': this.sortByFilter,
        'certification_country': 'US',
        'certification': this.ratingFilter,
        'with_genres': this.genresFilter
      },
      this.movieService.getPage()
    );
  }

  getMovieGenres(): void {
    this.movieService.getMovieGenres().subscribe(data => {
      this.genres = data.genres
    });
  }

  onScroll(): void {
    this.discoverMovies();
  }

  onFilterChange(newValue): void {
    this.ratingFilter = newValue;
    this.movieService.clear();
    this.discoverMovies();
  }

  onGenreFilterChange(newValue): void {
    this.genresFilter = newValue;
    this.movieService.clear();
    this.discoverMovies();
  }

  onSortByFilterChange(newValue): void {
    this.sortByFilter = newValue;
    this.movieService.clear();
    this.discoverMovies();
  }
}
