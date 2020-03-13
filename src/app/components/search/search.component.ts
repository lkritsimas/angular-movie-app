import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  searchTerm: string = '';

  constructor(private router: Router, private searchService: SearchService) {
    searchService.searchTerm$.subscribe({
      next: (term) => this.searchTerm = term
    });
  }

  ngOnInit(): void { }

  search(): void {
    if (!this.searchTerm) {
      this.router.navigate(['search']);
      return;
    }

    // this.searchService.search(this.searchTerm);

    const parsedTerm = this.searchService.parseSearchTerm(this.searchTerm);
    if (parsedTerm.type) {
      this.searchService.search(parsedTerm.term, parsedTerm.type);
    } else {
      this.searchService.search(parsedTerm.term);
    }

    if (!parsedTerm.type)
      this.router.navigate(['search', this.searchTerm]);
    else
      this.router.navigate(['search', parsedTerm.type, parsedTerm.term]);
  }
}
