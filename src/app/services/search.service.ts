import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Movie } from '../movie';
import { Person } from '../person';
import { API_URL, API_KEY } from '../api.config';
import { MovieService } from './movie.service';
import { PersonService } from './person.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchPersonEndpoint: string = '/search/person';
  private searchMovieEndpoint: string = '/search/movie';
  public searchTerm = new BehaviorSubject<string>('');

  constructor(private httpClient: HttpClient, private movieService: MovieService, private personService: PersonService) { }

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

  parseSearchTerm(term: string) {
    term = term.trim();
    const found = term.match(/^(?:(person|movie):)?\s*(.+?)$/);

    return {
      type: found[1] || null,
      term: found[2] || null
    };
  }

  searchMovies(term: string): void {
    const queryString = this.createQueryString(this.searchMovieEndpoint, {
      'query': term
    });

    this.httpClient.get<Movie[]>(queryString)
      .subscribe({
        next: (response) => this.movieService.resultSource.next(response['results'])
      });
  }

  searchPeople(term: string): void {
    const queryString = this.createQueryString(this.searchPersonEndpoint, {
      'query': term
    });

    this.httpClient.get<Movie[]>(queryString)
      .subscribe({
        next: (response) => this.personService.peopleSource.next(response['results'])
      });
  }

  // searchPeople(term: string): Observable<Person[]> {
  //   const queryString = this.createQueryString(this.searchPersonEndpoint, {
  //     'query': term
  //   });
  //   return this.httpClient.get<Person[]>(queryString);
  // }

  search(term: string): void {
    // Update search term
    this.searchTerm.next(term);

    const parsed = this.parseSearchTerm(term);

    if (!parsed.type || parsed.type === 'movie') {
      this.searchMovies(parsed.term);
    } else if (parsed.type === 'person') {
      this.searchPeople(parsed.term);
    }
  }
}
