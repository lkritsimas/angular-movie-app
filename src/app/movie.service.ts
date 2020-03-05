import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { tap, share, debounceTime, distinctUntilChanged, map } from 'rxjs/operators';

import { API_KEY, API_URL } from './api.config';
import { Movie, Genre } from './movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private movieDetailsEndpoint: string = '/movie';
  private discoverMoviesEndpoint: string = '/discover/movie';
  private popularMoviesEndpoint: string = '/movie/popular';
  private upcomingMoviesEndpoint: string = '/movie/upcoming';
  private topRatedMoviesEndpoint: string = '/movie/top_rated';
  private searchMovieEndpoint: string = '/search/movie';
  private searchPersonEndpoint: string = '/search/person';
  private movieGenresEndpoint: string = '/genre/movie/list';

  public fetchType: string = '';
  public prevFetchType: string = '';
  private resultSource = new BehaviorSubject<Movie[]>([]);
  public result = this.resultSource.asObservable();
  public searchTerm = new BehaviorSubject<string>('');

  private currentPage: number = 0;

  constructor(private router: Router, private httpClient: HttpClient) { }

  createQueryString(path: string, params?: any, page?: number): string {
    let queryParamsString: string;

    if (params || page) {
      const mergedObj = {
        ...{ 'page': page || 1 },
        ...params
      };

      // Build query string
      queryParamsString = Object.keys(mergedObj)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(mergedObj[k]))
        .join('&');
    }

    return `${API_URL}${path}?${queryParamsString ? queryParamsString + '&' : ''}api_key=${API_KEY}`;
  }

  getMovieGenres(): Observable<Genre[]> {
    const queryString = this.createQueryString(this.movieGenresEndpoint);
    return this.httpClient.get<Genre[]>(queryString)
      .pipe(
        tap(_ => console.log('fetched movie genres')),
        map(response => response['genres']),
        share(),
      );
  }

  getMovieDetails(id: string): Observable<Movie> {
    const queryString = this.createQueryString(`${this.movieDetailsEndpoint}/${id}`, {
      'append_to_response': 'release_dates,similar,credits'
    });
    return this.httpClient.get<Movie>(queryString)
      .pipe(
        tap(_ => console.log(`fetched movie ${id}`)),
        share()
      );
  }

  discoverMovies(params?: any, page?: number) {
    const queryString = this.createQueryString(this.discoverMoviesEndpoint, params, page);
    return this.httpClient.get<Movie[]>(queryString).subscribe(response => {
      return this.resultSource.next([...this.resultSource.getValue(), ...response['results']])
    });
  }

  getPopularMovies(page?: number) {
    const queryString = this.createQueryString(this.popularMoviesEndpoint, null, page);
    return this.httpClient.get<Movie[]>(queryString).subscribe(response =>
      this.resultSource.next([...this.resultSource.getValue(), ...response['results']])
    );
  }

  getTopRatedMovies(page?: number) {
    const queryString = this.createQueryString(this.topRatedMoviesEndpoint, null, page);
    return this.httpClient.get<Movie[]>(queryString).subscribe(response =>
      this.resultSource.next([...this.resultSource.getValue(), ...response['results']])
    );
  }

  getUpcomingMovies(page?: number) {
    const queryString = this.createQueryString(this.upcomingMoviesEndpoint, null, page);
    return this.httpClient.get<Movie[]>(queryString).subscribe(response => {
      return this.resultSource.next([...this.resultSource.getValue(), ...response['results']])
    });
  }

  parseSearchTerm(term: string) {
    term = term.trim();
    const found = term.match(/^(?:(person|movie):)?\s*(.+?)$/);

    return {
      type: found[1] || null,
      term: found[2] || null
    };
  }

  search(term: string = '') {
    // Update search term
    this.searchTerm.next(term);

    if (!term) return this.router.navigate(['search']);

    const parsed = this.parseSearchTerm(term);
    let apiEndPoint = this.searchMovieEndpoint;
    if (parsed.type === 'person')
      apiEndPoint = this.searchPersonEndpoint;

    const queryString = this.createQueryString(apiEndPoint, {
      'query': parsed.term
    });

    this.httpClient.get<Movie[]>(queryString)
      .subscribe({
        next: (response) => this.resultSource.next(response['results'])
      });

    // this.router.navigate(['search', term]);
  }

  clear() {
    this.resultSource.next([]);
    this.currentPage = 0;
  }

  getPage(): number {
    this.setPage();
    return this.currentPage;
  }

  setPage(page?: number) {
    if (!page)
      this.currentPage += 1;
    else
      this.currentPage = page;
  }
}
