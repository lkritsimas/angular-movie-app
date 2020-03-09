import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import { inject } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

import { ListItem, ListItems } from '../list';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private watchListKey: string = 'watchList';
  private myListsKey: string = 'myLists';
  private _watchList: ListItem[];
  private _myLists: ListItems[];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.initLists();
  }

  private initLists(): void {
    this._myLists = this.storage.get(this.myListsKey) || {};
    this._watchList = this.storage.get(this.watchListKey) || [];
  }

  get watchList(): ListItem[] {
    return this._watchList;
  }

  get myLists(): ListItems[] {
    return this._myLists;
  }

  //  Create a new list
  newList(title: string): boolean {
    if (title in this._myLists)
      return false;

    let currList = this._myLists;
    currList[title] = [];

    this.storage.set(this.myListsKey, currList);

    return true;
  }

  // Add new item to a list
  addToList(list: string, id: number, type: string): void {
    if (!(list in this._myLists))
      return;

    const currList = this._myLists;

    currList[list].push({
      id: id,
      type: type
    });

    this.storage.set(this.myListsKey, currList);
  }

  // Remove a specific entry from a list
  removeFromList(list: string, id: number): boolean {
    if (!(list in this._myLists))
      return false;

    this._myLists = this._myLists[list].filter((list) => list.id != id);
  }

  // Remove a specific list from array
  removeList(list: string): boolean {
    if (!(list in this._myLists))
      return false;

    delete this._myLists[list];
    this.storage.set(this.myListsKey, this._myLists);

    return true;
  }

  // Add new item to watch list
  addToWatchList(id: number, type: string): void {
    const watchList = this.storage.get(this.watchListKey) || [];

    watchList.push({
      id: id,
      type: type
    });

    this.storage.set(this.watchListKey, watchList);
  }

  // Empty entire watch list
  clearWatchList(): void {
    this.storage.remove(this.watchListKey);
  }
}
