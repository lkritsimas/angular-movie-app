import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, concatMap, tap } from 'rxjs/operators';

import { LocalStorageService } from '../../services/local-storage.service';
import { TitleService } from '../../services/title.service';
import { ListItems } from '../../list';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {
  private _title: string;
  public title: string;
  myList: ListItems;

  constructor(
    private activatedRoute: ActivatedRoute,
    private localStorageService: LocalStorageService,
    private titleService: TitleService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .pipe(
        tap(params => this._title = params.get('title').toLowerCase()),
        concatMap(() => this.localStorageService.myLists),
        map((lists: ListItems[]) => {
          return lists.find(list => list.title.toLowerCase() === this._title)
        })
      )
      .subscribe((list: ListItems) => {
        this.myList = list;
        this.title = list.title;
        this.titleService.setTitle(list.title);
      });
  }
}
