import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

// import { MovieService } from '../../services/movie.service';
import { SearchService } from '../../services/search.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private router: Router, private searchService: SearchService) {
    searchService.searchTerm.subscribe({
      next: (term) => this.searchTerm = term
    });
  }

  ngOnInit(): void { }

  search(): void {
    if (!this.searchTerm) {
      this.router.navigate(['search']);
      return;
    }

    this.searchService.search(this.searchTerm);
    this.router.navigate(['search', this.searchTerm]);
  }
}
