import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MoviesComponent } from './components/movies/movies.component';
import { SearchComponent } from './components/search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { InfiniteScrollComponent } from './components/infinite-scroll/infinite-scroll.component';
import { DiscoverComponent } from './components/discover/discover.component';
import { PersonDetailComponent } from './components/person-detail/person-detail.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { ImageComponent } from './components/image/image.component';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    SearchComponent,
    MovieDetailComponent,
    SearchResultComponent,
    InfiniteScrollComponent,
    DiscoverComponent,
    PersonDetailComponent,
    LoadingSpinnerComponent,
    ImageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
