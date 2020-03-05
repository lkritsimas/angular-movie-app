import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

import { PersonService } from '../../person.service';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
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
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.personService.getPersonDetails(+id)
      .pipe(
        tap(response => console.log(response)),
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
      });
  }

  // Limit amount of visible movies
  get castLimit() { return this._toggleCastLimit ? -1 : 10; }
  toggleCastLimit() { this._toggleCastLimit = !this._toggleCastLimit; }
}
