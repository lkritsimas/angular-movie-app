import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';

import { MovieService } from '../../services/movie.service';
import { Movie } from '../../movie';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  movies: Observable<Movie[]>;
  searchTerm: string = '';
  routeTerm: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.routeTerm = this.route.snapshot.paramMap.get('term');

    this.movieService.searchTerm.subscribe({
      next: (term) => this.searchTerm = term
    });

    // Search by route
    if (this.routeTerm && this.routeTerm !== this.searchTerm) {
      this.movieService.search(this.routeTerm);
      this.searchTerm = this.routeTerm;
    }

    this.movies = this.movieService.result;
  }
}
