import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError, retry } from 'rxjs/operators';

import { Movie, Genre } from '../movie';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService extends HttpService {
  private movieDetailsEndpoint: string = '/movie';
  private discoverMoviesEndpoint: string = '/discover/movie';
  private popularMoviesEndpoint: string = '/movie/popular';
  private upcomingMoviesEndpoint: string = '/movie/upcoming';
  private topRatedMoviesEndpoint: string = '/movie/top_rated';
  private movieGenresEndpoint: string = '/genre/movie/list';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getMovieGenres(): Observable<Genre[]> {
    const queryString = this.createQueryString(this.movieGenresEndpoint);
    return this.httpClient.get<Genre[]>(queryString)
      .pipe(
        map(response => response['genres']),
        retry(3),
        catchError(this.handleError<Movie>('getMovieGenres'))
      );
  }

  getMovieDetails(id: string): Observable<Movie> {
    const queryString = this.createQueryString(`${this.movieDetailsEndpoint}/${id}`, {
      'append_to_response': 'release_dates,similar,credits'
    });
    return this.httpClient.get<Movie>(queryString)
      .pipe(
        retry(3),
        catchError(this.handleError<Movie>('getMovieDetails'))
      );
  }

  getDiscoverMovies(params?: any): Observable<Movie[]> {
    if (!this.hasNextPage()) return of([]);
    this.nextPage();

    const queryString = this.createQueryString(this.discoverMoviesEndpoint, params, this.currentPage);
    return this.httpClient.get<Movie[]>(queryString)
      .pipe(
        tap((response: any) => {
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
        }),
        map(response => response['results']),
        retry(3),
        catchError(this.handleError<Movie[]>('discoverMovies', []))
      );
  }

  getPopularMovies(): Observable<Movie[]> {
    if (!this.hasNextPage()) return of([]);
    this.nextPage();

    const queryString = this.createQueryString(this.popularMoviesEndpoint, null, this.currentPage);
    return this.httpClient.get<Movie[]>(queryString)
      .pipe(
        tap((response: any) => {
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
        }),
        map(response => response['results']),
        retry(3),
        catchError(this.handleError<Movie[]>('getPopularMovies', []))
      );
  }

  getTopRatedMovies(): Observable<Movie[]> {
    if (!this.hasNextPage()) return of([]);
    this.nextPage();

    const queryString = this.createQueryString(this.topRatedMoviesEndpoint, null, this.currentPage);
    return this.httpClient.get<Movie[]>(queryString)
      .pipe(
        tap((response: any) => {
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
        }),
        map(response => response['results']),
        retry(3),
        catchError(this.handleError<Movie[]>('getTopRatedMovies', []))
      );
  }

  getUpcomingMovies(): Observable<Movie[]> {
    if (!this.hasNextPage()) return of([]);
    this.nextPage();

    const queryString = this.createQueryString(this.upcomingMoviesEndpoint, null, this.currentPage);
    return this.httpClient.get<Movie[]>(queryString)
      .pipe(
        tap((response: any) => {
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
        }),
        map(response => response['results']),
        retry(3),
        catchError(this.handleError<Movie[]>('getUpcomingMovies', []))
      );
  }
}
