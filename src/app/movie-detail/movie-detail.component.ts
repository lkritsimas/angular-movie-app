import { Component, OnInit } from '@angular/core';

import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';
import { TitleService } from '../title.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  similarMovies: any;
  movieBackdrops: any;
  movieGenres: string[];
  movieRating: string;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private titleService: TitleService
  ) {
    const id = this.route.snapshot.paramMap.get("id");

    this.getMovieDetails(id);
  }

  ngOnInit(): void { }

  getMovieDetails(id: string): void {
    this.movieService.getMovieDetails(id).subscribe(movie => {
      if (!movie) return;

      const releaseDate = new Date(movie.release_date).getFullYear();
      this.titleService.setTitle(`${movie.title} (${releaseDate})`);
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
