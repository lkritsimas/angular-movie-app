import { Inject, Injectable, OnInit } from '@angular/core';
import { LOCAL_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import { inject } from '@angular/core/testing';
import { Observable, of, Subject, BehaviorSubject } from 'rxjs';

import { ListItem, ListItems } from '../list';
import { LocalStorageService as localStService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService implements OnInit {
  private watchListKey: string = 'watchList';
  private myListsKey: string = 'myLists';
  private _watchList: ListItem[];
  private _myLists: ListItems[];

  private listSource = new BehaviorSubject<ListItems[]>([]);
  public myLists = this.listSource.asObservable();

  constructor(private storage: localStService) {
    this.initLists();
  }

  ngOnInit() {
    this.initLists();
  }

  private initLists(): void {
    this._myLists = this.storage.retrieve(this.myListsKey) || {};
    this._watchList = this.storage.retrieve(this.watchListKey) || [];
    this.listSource.next(this._myLists);

    this.storage.observe(this.myListsKey).subscribe((value) => {
      this._myLists = value || {};
      this.listSource.next(value || {});
    });

    this.storage.observe(this.watchListKey).subscribe((value) => {
      this._watchList = value || [];
    });
  }

  get watchList(): ListItem[] {
    return this._watchList;
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

  // Add new item to watch list
  addToWatchList(id: number): void {
    const watchList = this.storage.retrieve(this.watchListKey) || [];

    watchList.push(id);

    this.storage.store(this.watchListKey, watchList);
  }

  // Empty entire watch list
  clearWatchList(): void {
    this.storage.clear(this.watchListKey);
  }

  // Check if 
  isInMyList(list: string, id: number) {
    if (!id || !(list in this._myLists))
      return false;

    return this._myLists[list].find(item => item.id === id);
  }
}
