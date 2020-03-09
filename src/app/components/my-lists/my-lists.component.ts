import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { LocalStorageService } from '../../services/local-storage.service';
import { slideInOut } from '../../animations';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-my-lists',
  templateUrl: './my-lists.component.html',
  styleUrls: ['./my-lists.component.scss'],
  animations: [slideInOut]
})
export class MyListsComponent implements OnInit {
  faPlus = faPlus;
  newListFormVisible: boolean = false;
  myLists = {};

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.myLists = this.localStorageService.getMyLists();
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
