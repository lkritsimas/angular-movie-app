import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API_KEY, API_URL } from './api';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieDetailsEndpoint: string = '/movie';
  private discoverMoviesEndpoint: string = '/discover/movie';
  private upcomingMoviesEndpoint: string = '/movie/upcoming';
  private topRatedMoviesEndpoint: string = '/movie/top_rated';
  private searchEndpoint: string = '/search/movie';

  private resultSource = new BehaviorSubject<object>({});
  public result = this.resultSource.asObservable();
  public searchTerm = new BehaviorSubject<string>('');

  constructor(private router: Router, private httpClient: HttpClient) { }

  createQueryString(path: string, params?: any): string {
    let queryParamsString: string;
    if (params) {
      // Build query string
      queryParamsString = Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
    }

    return `${API_URL}${path}?${queryParamsString ? queryParamsString + '&' : ''}api_key=${API_KEY}`;
  }

  getMovieDetails(id: string): Observable<any> {
    const queryString = this.createQueryString(`${this.movieDetailsEndpoint}/${id}`, {
      'append_to_response': 'release_dates,images,similar,credits'
    });
    return this.httpClient.get(queryString).pipe(
      tap(_ => console.log(`fetched movie ${id}`))
    );
  }

  discoverMovies(params?: any) {
    const queryString = this.createQueryString(this.discoverMoviesEndpoint, params);
    return this.httpClient.get(queryString).subscribe(response => {
      return this.resultSource.next(response)
    });
  }

  getTopRatedMovies() {
    const queryString = this.createQueryString(this.topRatedMoviesEndpoint);
    return this.httpClient.get(queryString).subscribe(response =>
      this.resultSource.next(response)
    );
  }

  getUpcomingMovies() {
    const queryString = this.createQueryString(this.upcomingMoviesEndpoint);
    return this.httpClient.get(queryString).subscribe(response =>
      this.resultSource.next(response)
    );
  }

  search(term: string = '') {
    // Update search term
    this.searchTerm.next(term)

    if (!term) return this.router.navigate(['search']);

    const queryString = this.createQueryString(this.searchEndpoint, {
      'query': term
    });
    this.httpClient.get(queryString).subscribe({
      next: (response) => this.resultSource.next(response)
    });

    this.router.navigate(['search', term]);
  }
}
