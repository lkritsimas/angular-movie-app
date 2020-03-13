import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map, switchMap } from 'rxjs/operators';

import { PersonService } from '../../services/person.service';
import { ImageService } from '../../services/image.service';
import { TitleService } from '../../services/title.service';
import { Person, Cast, Crew } from '../../person';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  loading: boolean = false;
  person: Person;
  moviesAsCast: Cast[];
  moviesAsCrew: Crew[];
  private _toggleCast: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private personService: PersonService,
    public imageService: ImageService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        tap(() => this.loading = true),
        map(params => params.get('id')),
        switchMap(id => this.personService.getPersonDetails(+id))
      )
      .subscribe((person: Person) => {
        this.person = person;
        this.titleService.setTitle(person.name);

        const { cast, crew } = person['movie_credits'];
        this.moviesAsCast = <Cast[]>cast
          .sort((a: Cast, b: Cast) => {
            // Sort by popularity and poster_path not null
            return (a.popularity && a.poster_path || b.popularity && b.poster_path) &&
              (b.popularity && !b.poster_path ? -1 : a.popularity && !a.poster_path ? 1 : 0);
          });
        this.moviesAsCrew = <Crew[]>crew;

        // Hide loading spinner
        this.loading = false;
      });
  }

  // Limit amount of visible movies
  get fullCast() { return this._toggleCast; }
  get castLimit() { return this._toggleCast ? -1 : 9; }
  toggleCastLimit() { this._toggleCast = !this._toggleCast; }
}
