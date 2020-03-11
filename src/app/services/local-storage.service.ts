import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService as localStService } from 'ngx-webstorage';

import { ListItem, ListItems } from '../list';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private myListsKey: string = 'myLists';
  private _myLists: ListItems[];

  private listSource = new BehaviorSubject<ListItems[]>([]);
  public myLists = this.listSource.asObservable();

  constructor(private storage: localStService) {
    this.initLists();
  }

  private initLists(): void {
    this._myLists = this.storage.retrieve(this.myListsKey) || [];
    this.listSource.next(this._myLists);

    this.storage.observe(this.myListsKey).subscribe((lists: ListItems[]) => {
      this._myLists = lists || [];
      this.listSource.next(this._myLists);
    });
  }

  //  Create a new list
  newList(title: string): boolean {
    if (this._myLists.some(list => list.title === title))
      return false;

    let currList = this._myLists;
    currList.push({
      title: title,
      movies: []
    });

    this.storage.store(this.myListsKey, currList);

    return true;
  }

  // Add new item to a list
  addToList(list: string, id: number, image: string): void {
    if (this.isInList(list, id))
      return;


    const currList = this._myLists;

    currList
      .find(currList => currList.title === list)
      .movies
      .push({
        id: id,
        image: image
      });

    this.storage.store(this.myListsKey, currList);
  }

  // Remove a specific entry from a list
  removeFromList(list: string, id: number): boolean {
    if (!this.isInList(list, id))
      return false;

    // Probably a bad way of doing this, but hey, it works!
    const currList = this._myLists;
    const listIndex = currList.findIndex(currList => currList.title === list);
    const movieIndex = currList[listIndex].movies.findIndex(item => item.id === id);
    currList[listIndex].movies.splice(movieIndex, 1);

    this.storage.store(this.myListsKey, currList);

    return true;
  }

  // Remove a specific list from array
  removeList(list: string): boolean {
    const index = this._myLists.findIndex(currList => currList.title === list);
    if (index === -1)
      return false;

    const currList = this._myLists;
    currList.splice(index, 1);

    this.storage.store(this.myListsKey, currList);

    return true;
  }

  // Saves a reordered array
  changeOrder(list) {
    if (!list) return;
    this.storage.store(this.myListsKey, list);
  }

  // Check if movie exists in list
  isInList(list: string, id: number) {
    const currList = this._myLists.find(currList => currList.title === list);

    return currList.movies.some(movie => movie.id === id);
  }
}
