import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { API_KEY, API_URL } from '../api.config';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private personDetailsEndpoint = '/person';

  constructor(private httpClient: HttpClient) { }

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

  getPersonDetails(id: number) {
    const queryString = this.createQueryString(`${this.personDetailsEndpoint}/${id}`, {
      'append_to_response': 'movie_credits'
    });
    return this.httpClient.get(queryString).pipe(
      tap(_ => console.log(`fetched person ${id}`))
    );
  }
}
