import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MovieService } from '../movie.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {
  movie: any;
  similarMovies: any;
  movieBackdrops: any;
  genres: string[];

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    const id = this.route.snapshot.paramMap.get("id");

    this.getMovieDetails(id);
    this.getSimilarMovies(id);
    this.getMovieImages(id);
  }

  ngOnInit(): void { }

  getMovieDetails(id: string): void {
    this.movieService.getMovieDetails(id).subscribe(movie => {
      this.genres = movie.genres.map(genre => genre.name);
      this.movie = movie;
    });
  }

  getSimilarMovies(id: string): void {
    this.movieService.getSimilarMovies(id).subscribe(similarMovies => {
      this.similarMovies = similarMovies;
    });
  }

  getMovieImages(id: string): void {
    this.movieService.getMovieImages(id).subscribe(movieImages => {
      console.log(movieImages)
      this.movieBackdrops = movieImages.backdrops;
    });
  }
}
