import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxWebstorageModule } from 'ngx-webstorage';

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
import { RevealContentComponent } from './components/reveal-content/reveal-content.component';
import { TruncateTextPipe } from './pipes/truncate-text.pipe';
import { ParagraphPipe } from './pipes/paragraph.pipe';
import { ParallaxDirective } from './directives/parallax.directive';
import { MyListsComponent } from './components/my-lists/my-lists.component';
import { AddToListComponent } from './components/add-to-list/add-to-list.component';
import { LazyLoadImagesDirective } from './directives/lazy-load-images.directive';
import { PeopleComponent } from './components/people/people.component';
import { MyListComponent } from './components/my-list/my-list.component';
import { SearchService } from './services/search.service';

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
    ImageComponent,
    RevealContentComponent,
    TruncateTextPipe,
    ParagraphPipe,
    ParallaxDirective,
    MyListsComponent,
    AddToListComponent,
    LazyLoadImagesDirective,
    PeopleComponent,
    MyListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    NgScrollbarModule,
    NgxWebstorageModule.forRoot({ prefix: 'mml', separator: '.', caseSensitive: true }),
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
