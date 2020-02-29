import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  movies: Observable<any>;
  searchTerm: string = '';

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    const term = this.route.snapshot.paramMap.get('term');

    if (term) {
      this.movieService.search(term);
      this.searchTerm = term;
    }

    this.movies = this.movieService.result;
  }

  ngOnInit(): void {
    this.movieService.searchTerm.subscribe({
      next: (term) => this.searchTerm = term
    });
  }
}
