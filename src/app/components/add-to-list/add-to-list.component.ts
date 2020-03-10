import { Component, OnInit, Input } from '@angular/core';
import { faPlus, faTimes, faHeart } from '@fortawesome/free-solid-svg-icons';

import { LocalStorageService } from '../../services/local-storage.service';
import { ListItems } from '../../list';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent implements OnInit {
  faPlus = faPlus;
  faTimes = faTimes;
  faHeart = faHeart;
  myLists: ListItems[];
  selectedList: string = '';
  @Input() id: number;
  @Input() image: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.localStorageService.myLists.subscribe(lists => this.myLists = lists);
  }

  onChange(newValue): void {
    this.selectedList = newValue;
  }

  removeFromList(): void {
    this.localStorageService.removeFromList(this.selectedList, this.id);
  }

  addToList(): void {
    this.localStorageService.addToList(this.selectedList, this.id, this.image);
  }

  isInList(list?: string, id?: number): boolean {
    id = id || this.id;
    list = list || this.selectedList;

    return this.localStorageService.isInList(list, id);
  }
}
