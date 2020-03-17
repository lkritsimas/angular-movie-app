import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

import { SearchService } from '../../services/search.service';
import { PersonService } from '../../services/person.service';
import { Person } from '../../person';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people$: BehaviorSubject<Person[]> = new BehaviorSubject<Person[]>([]);
  @Input() title: string = '';
  @Output() onScroll: EventEmitter<any> = new EventEmitter();
  @Input()
  set data(value) { this.people$.next(value); };
  get data() { return this.people$.getValue(); }

  constructor(private personService: PersonService) { }

  ngOnInit(): void { }

  ngOnDestroy(): void {
    this.personService.resetPage();
  }

  getPopularPeople(): void {
    this.personService.getPopularPeople()
      .subscribe({
        next: (people: Person[]) => this.people$.next([...this.people$.getValue(), ...people])
      });
  }

  runOnScroll(): void {
    this.onScroll.observers.length ? this.onScroll.emit() : this.getPopularPeople();
  }
}
