import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { Genre, Movie } from '../../movie';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  movies$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  genres: Genre[];
  genresFilter: string = '';
  ratingFilter: string = '';
  sortByFilter: string = 'popularity.desc';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getMovieGenres();
    this.discoverMovies();
  }

  discoverMovies(): void {
    this.movieService.getDiscoverMovies(
      {
        'sort_by': this.sortByFilter,
        'certification_country': 'US',
        'certification': this.ratingFilter,
        'with_genres': this.genresFilter
      }
    )
      .subscribe({
        next: (movies: Movie[]) => this.movies$.next([...this.movies$.getValue(), ...movies])
      });
  }

  getMovieGenres(): void {
    this.movieService.getMovieGenres()
      .subscribe((genres: Genre[]) => this.genres = genres);
  }

  onScroll(): void {
    this.discoverMovies();
  }

  onRatingFilterChange(newValue): void {
    this.ratingFilter = newValue;
    this.movieService.resetPage();
    this.movies$.next([]);
    this.discoverMovies();
  }

  onGenreFilterChange(newValue): void {
    this.genresFilter = newValue;
    this.movieService.resetPage();
    this.movies$.next([]);
    this.discoverMovies();
  }

  onSortByFilterChange(newValue): void {
    this.sortByFilter = newValue;
    this.movieService.resetPage();
    this.movies$.next([]);
    this.discoverMovies();
  }
}
