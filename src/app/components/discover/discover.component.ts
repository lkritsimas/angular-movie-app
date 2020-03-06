import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { Genre } from '../../movie';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  genres: Genre[];
  genresFilter: string = '';
  ratingFilter: string = '';
  sortByFilter: string = 'popularity.desc';
  // sortByFilterX = new BehaviorSubject<string>('');

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
    this.movieService.getMovieGenres()
      .subscribe((genres: Genre[]) =>
        this.genres = genres
      );
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
    // this.sortByFilterX
    //   .pipe(switchMap(rating => this.movieService.discoverMovies(rating)))
    //   .subscribe(data => {
    //     // this.movies$ = data.results
    //   });


    this.sortByFilter = newValue;
    this.movieService.clear();
    this.discoverMovies();
  }
}
