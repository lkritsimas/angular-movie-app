import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPlus, faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs/operators';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

import { LocalStorageService } from '../../services/local-storage.service';
import { slideInOut } from '../../animations';
import { Movie } from '../../movie';
import { Person } from '../../person';
import { ListItems } from '../../list';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
  animations: [slideInOut]
})
export class MyListsComponent implements OnInit {
  faPlus = faPlus;
  faTimes = faTimes;
  faHeart = faHeart;
  newListFormError: string = '';
  newListFormVisible: boolean = false;
  myLists: any[] = [];
  movies: Movie[] = [];
  people: Person[] = [];

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.myLists
      .pipe(
        tap((lists: ListItems[]) => this.myLists = lists)
      )
      .subscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.localStorageService.changeOrder(event.container.data);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  removeList(list: string): void {
    this.localStorageService.removeList(list);
  }

  toggleNewListForm(): void {
    this.newListFormVisible = !this.newListFormVisible;
  }

  onSubmitNewListForm(newListForm: NgForm): void {
    if (newListForm.invalid) return;

    const title = newListForm.value.title;
    const created = this.localStorageService.newList(title);
    if (!created) {
      this.newListFormError = `You already have a list titled "${title}"`;
      newListForm.form.controls['title'].setErrors({ 'invalid': true });
      return;
    }
    this.newListFormError = '';

    newListForm.resetForm();
    this.toggleNewListForm();
  }

}
