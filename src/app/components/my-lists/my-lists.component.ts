import { Component, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { faPlus, faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../services/local-storage.service';
import { slideInOut } from '../../animations';
import { Movie } from '../../movie';
import { Person } from '../../person';
import { ListItems } from '../../list';
// import { DragulaService } from 'ng2-dragula';
import { Subscription } from 'rxjs';
import { moveItemInArray, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
  animations: [slideInOut]
})
export class MyListsComponent implements OnInit, OnDestroy {
  faPlus = faPlus;
  faTimes = faTimes;
  faHeart = faHeart;
  newListFormError: string = '';
  newListFormVisible: boolean = false;
  myLists: any[] = [];
  movies: Movie[] = [];
  people: Person[] = [];
  subs = new Subscription();

  constructor(
    private localStorageService: LocalStorageService,
    // private dragulaService: DragulaService
  ) {
    // dragulaService.createGroup('list', {
    //   revertOnSpill: true
    // });

    // this.subs.add(
    //   dragulaService.dropModel('list')
    //     .subscribe(({ sourceModel, targetModel, item }) => {
    //       this.localStorageService.changeOrder(sourceModel);
    //     })
    // )
  }

  ngOnInit(): void {
    this.localStorageService.myLists
      .pipe(
        tap((lists: ListItems[]) => this.myLists = lists)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    // this.subs.unsubscribe();
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      console.log(event.container.data)
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
