import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {
  filter: string = '';

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.discoverMovies();
  }

  discoverMovies(): void {
    this.movieService.discoverMovies(
      {
        'sort_by': 'popularity.desc',
        'certification_country': 'US',
        'certification': this.filter
      },
      this.movieService.getPage()
    );
  }

  onScroll(): void {
    this.discoverMovies();
  }

  onFilterChange(newValue): void {
    this.filter = newValue;
    this.movieService.clear();
    this.discoverMovies();
  }

}
