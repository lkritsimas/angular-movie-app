import { Component, OnInit } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../../movie.service';
import { TitleService } from '../../title.service';

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
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map(params => params["id"]),
        switchMap(id => this.movieService.getMovieDetails(id))
      )
      .subscribe(movie => {
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

        window.scroll(0, 0);
      });
  }
}
