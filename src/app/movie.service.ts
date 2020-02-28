import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { API_KEY } from './api';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_URL: string = 'https://api.themoviedb.org/3';
  private popularMoviesUrl: string = '/movie/popular';
  private upcomingMoviesUrl: string = '/movie/upcoming';

  constructor(private httpClient: HttpClient) { }

  createUrlString(path: string): string {
    return `${this.API_URL}${path}?api_key=${API_KEY}`;
  }

  getPopularMovies(): Observable<any> {
    return this.httpClient.get(this.createUrlString(this.popularMoviesUrl)).pipe(
      tap(_ => console.log('fetched movies'))
    );
  }

  getUpcomingMovies(): Observable<any> {
    return this.httpClient.get(this.createUrlString(this.upcomingMoviesUrl)).pipe(
      tap(_ => console.log('fetched movies'))
    );
  }
}
