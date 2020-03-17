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

    this.router.navigate(['search'], { queryParams: { q: this.searchTerm.trim() } });
  }
}
