import { Component, OnInit } from '@angular/core';

import { MovieService } from '../movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchTerm: string;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void { }

  search(): void {
    // this.movieService.search(this.searchTerm).subscribe(movies => {
    //   this.movies = movies
    // });
    if (this.searchTerm.trim() !== '')
      this.movieService.search(this.searchTerm);
    else
      this.movieService.getUpcomingMovies();
  }
}
