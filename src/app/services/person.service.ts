import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, map, retry, catchError } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Person } from '../person';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class PersonService extends HttpService {
  private personDetailsEndpoint = '/person';
  private personPopularEndpoint = '/person/popular';

  constructor(private httpClient: HttpClient) {
    super();
  }

  getPersonDetails(id: number): Observable<Person> {
    const queryString = this.createQueryString(`${this.personDetailsEndpoint}/${id}`, {
      append_to_response: 'movie_credits'
    });
    return this.httpClient.get<Person>(queryString).pipe(
      catchError(this.handleError<Person>('getPersonDetails'))
    );
  }

  getPopularPeople(): Observable<Person[]> {
    if (!this.hasNextPage()) return of([]);
    this.nextPage();

    const queryString = this.createQueryString(this.personPopularEndpoint, null, this.currentPage);
    return this.httpClient.get<Person[]>(queryString)
      .pipe(
        tap((response: any) => {
          this.currentPage = response.page;
          this.totalPages = response.total_pages;
        }),
        map(response => response['results']),
        retry(3),
        catchError(this.handleError<Person[]>('getPopularPeople', []))
      );
  }
}
