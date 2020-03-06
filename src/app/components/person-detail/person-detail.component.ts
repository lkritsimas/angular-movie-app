import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map, switchMap } from 'rxjs/operators';

import { PersonService } from '../../services/person.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  loading: boolean = false;
  person: any;
  moviesAsCast: any;
  moviesAsCrew: any;
  _toggleCastLimit: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    public imageService: ImageService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        tap(() => this.loading = true),
        map(params => params.id),
        switchMap(id => this.personService.getPersonDetails(id))
      )
      .subscribe(response => {
        this.person = response;
        this.moviesAsCast = response['movie_credits'].cast
          .sort((a: any, b: any) => {
            // Sort by popularity and poster_path not null
            return (a.popularity && a.poster_path || b.popularity && b.poster_path) &&
              (b.popularity && !b.poster_path ? -1 : a.popularity && !a.poster_path ? 1 : 0);
          });
        this.moviesAsCrew = response['movie_credits'].crew;

        // Hide loading spinner
        this.loading = false;

        // Scroll back to top
        window.scroll(0, 0);
      });
  }

  // Limit amount of visible movies
  get castLimit() { return this._toggleCastLimit ? -1 : 9; }
  toggleCastLimit() { this._toggleCastLimit = !this._toggleCastLimit; }
}
