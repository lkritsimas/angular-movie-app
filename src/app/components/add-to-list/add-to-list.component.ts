import { Component, OnInit, Input } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { LocalStorageService } from '../../services/local-storage.service';
import { ListItems } from '../../list';

@Component({
  selector: 'app-add-to-list',
  templateUrl: './add-to-list.component.html',
  styleUrls: ['./add-to-list.component.scss']
})
export class AddToListComponent implements OnInit {
  faPlus = faPlus;
  myLists: ListItems[];
  selectedList: string = '';
  @Input() id: number;
  @Input() type: string;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.myLists = this.localStorageService.myLists;
  }

  addToList() {
    console.log('add');
    this.localStorageService.addToList(this.selectedList, this.id, this.type);
  }
}
