import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

import { LocalStorageService } from '../../services/local-storage.service';
import { slideInOut } from '../../animations';
import { Movie } from '../../movie';
import { Person } from '../../person';
import { ListItems } from 'src/app/list';
import { MovieService } from 'src/app/services/movie.service';
import { mergeMap } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
  animations: [slideInOut]
})
export class MyListsComponent implements OnInit {
  faPlus = faPlus;
  faTrash = faTrash;
  newListFormVisible: boolean = false;
  private _myLists: ListItems[];
  myLists: any[] = [];
  movies: Movie[] = [];
  people: Person[] = [];

  constructor(
    private localStorageService: LocalStorageService,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this._myLists = this.localStorageService.myLists;

    for (let list of Object.keys(this._myLists)) {
      for (let item of this._myLists[list]) {
        if (item.type === 'movie') {
          this.movieService.getMovieDetails(item.id)
            .subscribe(movie => {
              let index = this.myLists.findIndex(item => item.title === list);

              if (index === -1) {
                this.myLists.push({
                  title: list,
                  type: item.type,
                  movies: []
                })

                index = this.myLists.findIndex(item => item.title === list);
              }

              this.myLists[index]['movies'].push(movie);
            });
        }

      }
    }
  }

  removeList(list: string): void {
    this.localStorageService.removeList(list);
  }

  getMovieById(id: number): Movie {
    return this.movies.find(movie => movie.id === id);
  }

  toggleNewListForm(): void {
    this.newListFormVisible = !this.newListFormVisible;
  }

  onSubmitNewListForm(newListForm: NgForm): void {
    if (!newListForm.valid) return;

    this.localStorageService.newList(newListForm.value.title);

    newListForm.resetForm();
    this.toggleNewListForm();
  }
}
