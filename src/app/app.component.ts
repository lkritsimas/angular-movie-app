import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { TitleService } from './title.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'MyMovieList';

  public constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: TitleService,
  ) { }

  ngOnInit() {
    const appTitle = this.titleService.getTitle();

    // Set title based on route
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }

          console.log(route.snapshot)
          if (route.snapshot.data['title'])
            return route.snapshot.data['title'];

          return appTitle;
        })
      ).subscribe((title: string) => {
        this.titleService.setTitle(title);
      });
  }
}
