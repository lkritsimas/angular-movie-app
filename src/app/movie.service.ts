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
  private searchMovieEndpoint: string = '/search/movie';
  private searchPersonEndpoint: string = '/search/person';

  public fetchType: string = '';
  public prevFetchType: string = '';
  private resultSource = new BehaviorSubject<any[]>([]);
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

  getMovieDetails(id: string): Observable<any> {
    const queryString = this.createQueryString(`${this.movieDetailsEndpoint}/${id}`, {
      'append_to_response': 'release_dates,images,similar,credits'
    });
    return this.httpClient.get(queryString).pipe(
      tap(_ => console.log(`fetched movie ${id}`))
    );
  }

  discoverMovies(params?: any, page?: number) {
    const queryString = this.createQueryString(this.discoverMoviesEndpoint, params, page);
    return this.httpClient.get(queryString).subscribe(response => {
      return this.resultSource.next([...this.resultSource.getValue(), ...response['results']])
    });
  }

  getTopRatedMovies(page?: number) {
    const queryString = this.createQueryString(this.topRatedMoviesEndpoint, null, page);
    return this.httpClient.get(queryString).subscribe(response =>
      this.resultSource.next([...this.resultSource.getValue(), ...response['results']])
    );
  }

  getUpcomingMovies(page?: number) {
    const queryString = this.createQueryString(this.upcomingMoviesEndpoint, null, page);
    return this.httpClient.get(queryString).subscribe(response =>
      this.resultSource.next([...this.resultSource.getValue(), ...response['results']])
    );
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
    const parsed = this.parseSearchTerm(term);
    this.searchTerm.next(term);

    if (!term) return this.router.navigate(['search']);

    let endPoint = this.searchMovieEndpoint;
    if (parsed.type === 'person') endPoint = this.searchPersonEndpoint;

    const queryString = this.createQueryString(endPoint, {
      'query': parsed.term
    });

    this.httpClient.get(queryString).subscribe({
      next: (response) => this.resultSource.next(response['results'])
    });

    this.router.navigate(['search', term]);
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
