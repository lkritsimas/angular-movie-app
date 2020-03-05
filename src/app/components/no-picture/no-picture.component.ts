import { Component, OnInit, Input } from '@angular/core';
import { faFilm, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-no-picture',
  templateUrl: './no-picture.component.html',
  styleUrls: ['./no-picture.component.scss']
})
export class NoPictureComponent implements OnInit {
  @Input() movie: boolean;
  @Input() person: boolean;
  @Input() small: boolean;
  faFilm = faFilm;
  faUser = faUser;

  constructor() { }

  ngOnInit(): void {
    this.movie = this.movie !== undefined;
    this.person = this.person !== undefined;
    this.small = this.small !== undefined;
  }
}
