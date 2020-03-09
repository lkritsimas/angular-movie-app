import { Inject, Injectable } from '@angular/core';
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import { inject } from '@angular/core/testing';
import { Observable, of } from 'rxjs';

export interface ListItem {
  id: number;
  type: string;
}

export interface ListItems {
  [key: string]: ListItem[];
}

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private watchListKey: string = 'watchList';
  private myListsKey: string = 'myLists';
  private watchList: ListItem[];
  private myLists: ListItems[];

  constructor(@Inject(LOCAL_STORAGE) private storage: StorageService) {
    this.initLists();
  }

  private initLists(): void {
    this.myLists = this.storage.get(this.myListsKey) || {};
    this.watchList = this.storage.get(this.watchListKey) || [];
    console.log(this.myLists)
    console.log(this.watchList)
  }

  getWatchList(): ListItem[] {
    return this.watchList;
  }

  getMyLists(): ListItems[] {
    return this.myLists;
  }

  //  Create a new list
  newList(title: string): boolean {
    if (!title && title in this.myLists)
      return false;

    let currList = this.myLists;
    currList[title] = [];
    console.log(currList)

    this.storage.set(this.myListsKey, currList);

    return true;
  }

  // Add new item to a list
  addToList(list: string, id: number, type: string): void {
    if (!(list in this.myLists))
      return;

    const currList = this.myLists[list];

    currList.push({
      id: id,
      type: type
    });

    this.storage.set(this.myListsKey, currList);
  }

  // Remove a specific entry from a list
  removeFromList(list: string, id: number): boolean {
    if (!(list in this.myLists))
      return false;

    this.myLists = this.myLists[list].filter((list) => list.id != id);
  }

  // Remove a specific list from array
  removeList(list: string): boolean {
    if (!(list in this.myLists))
      return false;

    delete this.myLists[list];
    this.storage.set(this.myListsKey, this.myLists);

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
