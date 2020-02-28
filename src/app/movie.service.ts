import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_KEY } from './api';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL: string = 'https://api.themoviedb.org/3';
  private popularMoviesEndpoint: string = '/movie/popular';
  private upcomingMoviesEndpoint: string = '/movie/upcoming';
  private searchEndpoint: string = '/search/multi';

  private resultSource = new BehaviorSubject<object>({});
  public result = this.resultSource.asObservable();

  constructor(private httpClient: HttpClient) { }

  createUrlString(path: string, params?: string): string {
    return `${this.API_URL}${path}?${params ? params + '&' : ''}api_key=${API_KEY}`;
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
    if (!term.trim()) return of({});

    const searchString = this.createUrlString(this.searchEndpoint, `query=${term}`);
    this.httpClient.get(searchString).subscribe(response =>
      this.resultSource.next(response)
    );
  }
}
