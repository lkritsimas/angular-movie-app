import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../../services/movie.service';
import { TitleService } from '../../services/title.service';
import { ImageService } from '../../services/image.service';
import { Movie, Credits, Genre } from '../../movie';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  loading: boolean = false;
  movie: Movie;
  similarMovies?: Movie[];
  movieCredits?: Credits;
  movieGenres?: string[];
  movieRating?: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private titleService: TitleService,
    public imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(() => this.loading = true),
        map(params => params.id),
        switchMap(id => this.movieService.getMovieDetails(id))
      )
      .subscribe((movie: Movie) => {
        if (!movie) return;

        // Set document title
        const releaseYear = new Date(movie.release_date).getFullYear();
        this.titleService.setTitle(`${movie.title} (${releaseYear})`);

        this.movieCredits = <Credits>movie.credits;
        this.movieGenres = movie.genres.map((genre: Genre) => genre.name);
        this.similarMovies = (movie.similar && movie.similar.results) ? <Movie[]>movie.similar.results : null;

        // Get movie rating (MPAA)
        movie.release_dates.results.find(result => {
          if (result.iso_3166_1 === 'US')
            this.movieRating = result.release_dates[0].certification;
        })

        this.movie = movie;

        // Hide loading spinner
        this.loading = false;

        // Scroll back to top
        window.scroll(0, 0);
      });
  }
}
