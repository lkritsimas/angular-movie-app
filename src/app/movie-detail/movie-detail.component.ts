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

  constructor(private route: ActivatedRoute, private movieService: MovieService) {
    const id = this.route.snapshot.paramMap.get("id");
    this.movieService.getMovieDetails(id).subscribe(movie => {
      this.movie = movie;
    });
  }

  ngOnInit(): void { }

}
