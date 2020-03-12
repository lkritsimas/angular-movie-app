import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';

import { API_KEY, API_URL } from '../api.config';
import { Person } from '../person';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personDetailsEndpoint = '/person';
  public peopleSource = new BehaviorSubject<Person[]>([]);
  public people$ = this.peopleSource.asObservable();

  constructor(
    private httpClient: HttpClient
  ) { }

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

  getPersonDetails(id: number): Observable<Person> {
    const queryString = this.createQueryString(`${this.personDetailsEndpoint}/${id}`, {
      'append_to_response': 'movie_credits'
    });
    return this.httpClient.get<Person>(queryString).pipe(
      tap(_ => console.log(`fetched person ${id}`))
    );
  }

  // search(term: string = ''): Observable<Person[]> {
  //   // Update search term
  //   // this.searchTerm.next(term);

  //   if (!term) {
  //     this.router.navigate(['search']);
  //     return of([]);
  //   }

  //   const queryString = this.createQueryString(this.searchPersonEndpoint, {
  //     'query': term
  //   });

  //   this.router.navigate(['search', term]);

  //   return this.httpClient.get<Person[]>(queryString)
  //     .pipe(
  //       tap((response) => this.peopleSource.next(response['results']))
  //     );
  // }
}
