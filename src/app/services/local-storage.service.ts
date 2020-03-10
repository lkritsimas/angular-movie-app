import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService as localStService } from 'ngx-webstorage';

import { ListItem, ListItems } from '../list';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements OnInit {
  private myListsKey: string = 'myLists';
  private _myLists: ListItems[];

  private listSource = new BehaviorSubject<ListItems[]>([]);
  public myLists = this.listSource.asObservable();

  constructor(private storage: localStService) {
    this.initLists();
  }

  ngOnInit() { }

  private initLists(): void {
    this._myLists = this.storage.retrieve(this.myListsKey) || [];
    this.listSource.next(this._myLists);

    this.storage.observe(this.myListsKey).subscribe((lists: ListItems[]) => {
      this._myLists = lists || [];
      this.listSource.next(lists || []);
    });
  }

  //  Create a new list
  newList(title: string): boolean {
    if (title in this._myLists)
      return false;

    let currList = this._myLists;
    currList[title] = [];

    this.storage.store(this.myListsKey, currList);

    return true;
  }

  // Add new item to a list
  addToList(list: string, id: number, image: string): void {
    if (!(list in this._myLists) || this.isInMyList(list, id))
      return;

    const currList = this._myLists;

    currList[list].push({
      id: id,
      image: image
    });

    this.storage.store(this.myListsKey, currList);
  }

  // Remove a specific entry from a list
  removeFromList(list: string, id: number): boolean {
    if (!(list in this._myLists))
      return false;

    const currList = this._myLists;
    currList[list] = currList[list].filter(item => item.id !== id);
    this.storage.store(this.myListsKey, currList);

    return true;
  }

  // Remove a specific list from array
  removeList(list: string): boolean {
    if (!(list in this._myLists))
      return false;

    delete this._myLists[list];
    this.storage.store(this.myListsKey, this._myLists);

    return true;
  }

  // Check if 
  isInMyList(list: string, id: number) {
    if (!id || !(list in this._myLists))
      return false;

    return this._myLists[list].find(item => item.id === id);
  }
}
