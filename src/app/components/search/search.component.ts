import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
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
