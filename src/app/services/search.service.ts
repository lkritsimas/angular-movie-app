import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { tap, map, retry, catchError } from 'rxjs/operators';

import { API_URL, API_KEY } from '../api.config';
import { Movie } from '../movie';
import { Person } from '../person';
import { MovieService } from './movie.service';
import { PersonService } from './person.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService extends HttpService {
  private searchPersonEndpoint: string = '/search/person';
  private searchMovieEndpoint: string = '/search/movie';
  searchTerm$: Subject<string> = new Subject<string>();

  constructor(
    private httpClient: HttpClient,
    private movieService: MovieService,
    private personService: PersonService
  ) {
    super();
  }

  parseSearchTerm(term: string): any {
    term = term.trim();
    const found = term.match(/^(?:(person|movie):)?\s*(.+?)$/i);

    return {
      type: found[1] ? found[1].toLowerCase() : null,
      term: found[2] || null
    };
  }

  clearSearchTerm(): void {
    this.searchTerm$.next();
  }

  searchMovies(term: string): Observable<Movie[]> {
    if (!this.movieService.hasNextPage()) return of([]);
    this.movieService.nextPage();

    const queryString = this.createQueryString(this.searchMovieEndpoint, {
      query: term,
      page: this.movieService.currentPage
    });

    return this.httpClient.get<Movie[]>(queryString)
      .pipe(
        tap((response: any) => {
          this.movieService.currentPage = response.page;
          this.movieService.totalPages = response.total_pages;
        }),
        map(response => response['results']),
        retry(3),
        catchError(this.handleError<Movie[]>('searchMovies', []))
      );
  }

  searchPeople(term: string): Observable<Person[]> {
    if (!this.personService.hasNextPage()) return of([]);
    this.personService.nextPage();

    const queryString = this.createQueryString(this.searchPersonEndpoint, {
      query: term,
      page: this.personService.currentPage
    });

    return this.httpClient.get<Person[]>(queryString)
      .pipe(
        tap((response: any) => {
          this.personService.currentPage = response.page;
          this.personService.totalPages = response.total_pages;
        }),
        map(response => response['results']),
        retry(3),
        catchError(this.handleError<Person[]>('searchPeople', []))
      );
  }

  setTerm(term): void {
    this.searchTerm$.next(term.trim());
  }
}
