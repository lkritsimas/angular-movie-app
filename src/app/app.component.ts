import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event, NavigationStart, NavigationCancel, NavigationError, RouterEvent } from '@angular/router';
import { filter, map, debounceTime, tap } from 'rxjs/operators';
import { forkJoin, Subject } from 'rxjs';
import { NgScrollbar } from 'ngx-scrollbar';

import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('navBurger') navBurger: ElementRef;
  @ViewChild('navMenu') navMenu: ElementRef;
  @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar;
  title: string = 'MyMovieList';
  isLoading: boolean = false;

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService
  ) { }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();

    // this.router.events
    //   // .pipe(
    //   //   debounceTime(150)
    //   // )
    //   .subscribe((event: RouterEvent) => {
    //     if (event instanceof NavigationStart) {
    //       this.isLoading = true;
    //     }
    //     if (
    //       event instanceof NavigationEnd ||
    //       event instanceof NavigationCancel ||
    //       event instanceof NavigationError
    //     ) {
    //       this.isLoading = false;
    //     }
    //   });

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
    this.navBurger.nativeElement.classList.toggle('is-active');
    this.navMenu.nativeElement.classList.toggle('is-active');
  }
}
