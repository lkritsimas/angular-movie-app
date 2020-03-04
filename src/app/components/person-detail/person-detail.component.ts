import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { PersonService } from 'src/app/person.service';
import { tap, map, takeWhile, take, max, takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.scss']
})
export class PersonDetailComponent implements OnInit {
  person: any;
  moviesAsCast: any;
  moviesAsCrew: any;

  constructor(private personService: PersonService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.personService.getPersonDetails(+id)
      .pipe(
        tap(response => console.log(response)),
      )
      .subscribe(response => {
        this.person = response;
        this.moviesAsCast = response['movie_credits'].cast;
        this.moviesAsCrew = response['movie_credits'].crew;
      });
  }

}
