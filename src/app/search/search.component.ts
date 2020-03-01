import { Component, OnInit } from '@angular/core';

import { MovieService } from '../movie.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string = '';
  rating: string = '';

  constructor(private movieService: MovieService) {
    movieService.searchTerm.subscribe({
      next: (term) => this.searchTerm = term
    });
  }

  ngOnInit(): void { }

  search(): void {
    this.movieService.search(this.searchTerm);
  }
}
