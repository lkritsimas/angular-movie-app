import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';

import { Movie } from '../../movie';
import { Person } from '../../person';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  movies$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  people$: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  searchTerm: string = '';
  routeTerm: string;
  routeType: string;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        tap((params) => {
          this.routeType = params.get('type');
          this.routeTerm = params.get('term');

          if (this.routeTerm !== this.searchTerm)
            this.searchService.search(this.routeTerm);
        }),
        concatMap(() => this.searchService.searchTerm$),
        tap((term: string) => this.searchTerm = term)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.searchService.clearSearchTerm();
  }

  searchMovies(term?: string): void {
    this.searchService.searchMovies(term ? term : this.routeTerm)
      .subscribe({
        next: (movies: Movie[]) => this.movies$.next([...this.movies$.getValue(), ...movies])
      });
  }

  searchPeople(term?: string): void {
    this.searchService.searchPeople(term ? term : this.routeTerm)
      .subscribe({
        next: (people: Person[]) => this.people$.next([...this.people$.getValue(), ...people])
      });
  }

  onScroll(): void {
    if (!this.routeType || this.routeType === 'movie')
      this.searchMovies(this.searchTerm);
    else if (this.routeType === 'person')
      this.searchPeople(this.searchTerm);
  }
}
