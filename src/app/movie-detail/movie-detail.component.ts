import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { MovieService } from '../movie.service';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  similarMovies: any;
  movieCredits: any;
  movieBackdrops: any;
  movieGenres: string[];
  movieRating: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private titleService: TitleService
  ) {
    // Listen for route changes
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          return route.snapshot.paramMap.get('id');
        })
      )
      .subscribe((id: string) => {
        this.getMovieDetails(id);
        window.scroll(0, 0);
      });
  }

  ngOnInit(): void { }

  getMovieDetails(id: string): void {
    this.movieService.getMovieDetails(id).subscribe(movie => {
      if (!movie) return;

      // Set document title
      const releaseDate = new Date(movie.release_date).getFullYear();
      this.titleService.setTitle(`${movie.title} (${releaseDate})`);

      this.movieCredits = movie.credits;
      this.movieGenres = movie.genres.map(genre => genre.name);
      this.similarMovies = movie.similar && movie.similar.results ? movie.similar.results : null;
      this.movieBackdrops = movie.images && movie.images.backdrops ? movie.images.backdrops : null;
      // Get movie rating (MPAA)
      movie.release_dates.results.find(result => {
        if (result.iso_3166_1 === 'US')
          this.movieRating = result.release_dates[0].certification;
      })
      this.movie = movie;
    });
  }
}
