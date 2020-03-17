import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { tap, concatMap } from 'rxjs/operators';

import { Movie } from '../../movie';
import { Person } from '../../person';
import { SearchService } from '../../services/search.service';
import { MovieService } from '../../services/movie.service';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  movies$: BehaviorSubject<Movie[]> = new BehaviorSubject<Movie[]>([]);
  people$: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  searchTerm: string = '';
  parsedTerm: string = '';
  routeType: string;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService,
    private movieService: MovieService,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap
      .pipe(
        tap((params) => {
          const routeTerm = params.get('q');
          const parsed = this.searchService.parseSearchTerm(routeTerm);
          this.routeType = parsed.type;
          this.parsedTerm = parsed.term;

          // Has search term has updated?
          if (routeTerm !== this.searchTerm) {
            // Reset
            if (!parsed.type || parsed.type === 'movie') {
              this.movies$.next([]);
              this.movieService.resetPage();
            } else if (parsed.type === 'person') {
              this.people$.next([]);
              this.personService.resetPage();
            }
            // Set new search term
            this.searchService.setTerm(routeTerm);
          }

          // Get data
          if (!parsed.type || parsed.type === 'movie')
            this.searchMovies(parsed.term);
          else if (parsed.type === 'person')
            this.searchPeople(parsed.term);

          this.searchTerm = routeTerm;
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.searchService.clearSearchTerm();
  }

  searchMovies(term): void {
    this.searchService.searchMovies(term)
      .subscribe({
        next: (movies: Movie[]) => this.movies$.next([...this.movies$.getValue(), ...movies])
      });
  }

  searchPeople(term): void {
    this.searchService.searchPeople(term)
      .subscribe({
        next: (people: Person[]) => this.people$.next([...this.people$.getValue(), ...people])
      });
  }

  onScroll(): void {
    if (!this.routeType || this.routeType === 'movie')
      this.searchMovies(this.parsedTerm);
    else if (this.routeType === 'person')
      this.searchPeople(this.parsedTerm);
  }
}
