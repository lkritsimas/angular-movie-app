import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { filter, map, tap } from 'rxjs/operators';
import { NgScrollbar } from 'ngx-scrollbar';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faHeart = faHeart;
  @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar;
  title: string = 'MyMovieList';
  isLoading: boolean = false;
  navbarToggled: boolean = false;

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();

    // Set title based on route
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        filter(() => !!this.scrollbarRef),
        tap((event: NavigationEnd) =>
          this.scrollbarRef.scrollTo({ top: 0, duration: 0 })
        ),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          if (route.snapshot.data['title'])
            return route.snapshot.data['title'];

          return appTitle;
        })
      ).subscribe((title: string) => {
        this.titleService.setTitle(title);
      });
  }

  public toggleNavbar() {
    this.navbarToggled = !this.navbarToggled;
  }
}
