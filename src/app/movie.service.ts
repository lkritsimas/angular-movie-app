import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { catchError, map, tap, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_KEY } from './api';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL: string = 'https://api.themoviedb.org/3';
  private movieDetailsEndpoint: string = '/movie';
  private popularMoviesEndpoint: string = '/movie/popular';
  private upcomingMoviesEndpoint: string = '/movie/upcoming';
  private searchEndpoint: string = '/search/multi';

  private resultSource = new BehaviorSubject<object>({});
  public result = this.resultSource.asObservable();
  public searchTerm = new BehaviorSubject<string>('');

  constructor(private router: Router, private httpClient: HttpClient) { }

  createUrlString(path: string, params?: string): string {
    return `${this.API_URL}${path}?${params ? params + '&' : ''}api_key=${API_KEY}`;
  }

  getMovieDetails(id: string): Observable<any> {
    const searchString = this.createUrlString(`${this.movieDetailsEndpoint}/${id}`);
    return this.httpClient.get(searchString).pipe(
      tap(_ => console.log(`fetched movie ${id}`))
    );
  }

  getMovieImages(id: string): Observable<any> {
    const searchString = this.createUrlString(`/movie/${id}/images`, 'include_image_language=null');
    return this.httpClient.get(searchString).pipe(
      tap(_ => console.log(`fetched images for movie ${id}`))
    );
  }

  getSimilarMovies(id: string): Observable<any> {
    const searchString = this.createUrlString(`/movie/${id}/similar`);
    return this.httpClient.get(searchString).pipe(
      tap(_ => console.log(`fetched movies ${id}`))
    );
  }

  getPopularMovies() {
    const searchString = this.createUrlString(this.popularMoviesEndpoint);
    return this.httpClient.get(searchString).subscribe(response =>
      this.resultSource.next(response)
    );
    // return this.httpClient.get(this.createUrlString(this.popularMoviesEndpoint)).pipe(
    //   tap(_ => console.log('fetched movies'))
    // );
  }

  // getUpcomingMovies(): Observable<any> {
  getUpcomingMovies() {
    const searchString = this.createUrlString(this.upcomingMoviesEndpoint);
    return this.httpClient.get(searchString).subscribe(response =>
      this.resultSource.next(response)
    );
    // return this.httpClient.get(this.createUrlString(this.upcomingMoviesEndpoint)).pipe(
    //   tap(_ => console.log('fetched movies'))
    // );
  }

  search(term: string = '') {
    // Update search term
    this.searchTerm.next(term)

    if (!term) return this.router.navigate(['search']);

    const searchString = this.createUrlString(this.searchEndpoint, `query=${term}`);
    this.httpClient.get(searchString).subscribe({
      next: (response) => this.resultSource.next(response)
    });

    this.router.navigate(['search', term]);
  }
}
