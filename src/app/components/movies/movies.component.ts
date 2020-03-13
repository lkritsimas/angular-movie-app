import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Location } from "@angular/common";
import { BehaviorSubject } from 'rxjs';

import { ImageService } from '../../services/image.service';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../movie';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {
  movies$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  @Output()
  onScroll: EventEmitter<any> = new EventEmitter();
  @Input()
  set data(value) { this.movies$.next(value); };
  get data() { return this.movies$.getValue(); }

  path: string;
  title: string = '';
  currPath: string;
  filter: string = '';

  constructor(
    protected location: Location,
    private movieService: MovieService,
    public imageService: ImageService
  ) {
    this.path = location.path();
  }

  ngOnInit(): void {
    const pathParts = this.path.split("/");
    this.currPath = pathParts[pathParts.length - 1];
    this.fetchMovies();
  }

  // Clear service data on destroy
  ngOnDestroy() {
    this.movieService.resetPage();
  }

  fetchMovies() {
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

  runOnScroll(): void {
    this.onScroll.emit(this.fetchMovies());
  }

  getUpcomingMovies(): void {
    this.title = 'Upcoming movies';
    this.movieService.getUpcomingMovies()
      .subscribe({
        next: (movies: Movie[]) => this.movies$.next([...this.movies$.getValue(), ...movies])
      });
  }

  getPopularMovies(): void {
    this.title = 'Popular movies';
    this.movieService.getPopularMovies()
      .subscribe({
        next: (movies: Movie[]) => this.movies$.next([...this.movies$.getValue(), ...movies])
      });
  }

  getTopRatedMovies(): void {
    this.title = 'Top rated movies';
    this.movieService.getTopRatedMovies()
      .subscribe({
        next: (movies: Movie[]) => this.movies$.next([...this.movies$.getValue(), ...movies])
      });
  }

  onFilterChange(newValue) {
    this.filter = newValue;
    this.movieService.resetPage();
    this.fetchMovies();
  }
}
