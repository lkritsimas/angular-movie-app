import { Injectable, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TitleService extends Title {
  title: string;
  prevTitle: string;

  constructor(@Inject(DOCUMENT) private _document: any) {
    super(_document);
    // Get application title
    this.title = this.getTitle();
  }

  public setTitle(newTitle: string = '') {
    newTitle = newTitle.trim();
    if (newTitle === this.prevTitle) return;

    // Set new title if not the same as previous
    this._document.title = `${newTitle !== '' ? newTitle + ' - ' : ''}${this.title}` || '';
    this.prevTitle = this.title;
  }
}
