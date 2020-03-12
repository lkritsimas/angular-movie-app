import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../movie';
import { Person } from '../../person';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  searchTerm: string = '';
  routeTerm: string;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.routeTerm = this.route.snapshot.paramMap.get('term');

    this.searchService.searchTerm.subscribe({
      next: (term) => this.searchTerm = term
    });

    // Search by route
    if (this.routeTerm && this.routeTerm !== this.searchTerm) {
      this.searchService.search(this.routeTerm);
      this.searchTerm = this.routeTerm;
    }
  }
}
