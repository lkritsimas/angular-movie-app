import { Injectable } from '@angular/core';

import { API_URL } from '../api.config';
import { API_KEY } from '../api.config';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  protected prevPage: number;
  public currentPage: number;
  public totalPages: number;

  constructor() {
    this.resetPage();
  }

  // Fantastically unessecary query builder
  protected createQueryString(path: string, params?: any, page?: number): string {
    let queryParamsString: string;

    if (params || page) {
      const mergedObj = {
        ...{ 'page': page || 1 },
        ...params
      };

      // Build query string
      queryParamsString = Object.keys(mergedObj)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(mergedObj[k]))
        .join('&');
    }

    return `${API_URL}${path}?${queryParamsString ? queryParamsString + '&' : ''}api_key=${API_KEY}`;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  hasNextPage(): boolean {
    if (!this.totalPages || this.currentPage !== this.prevPage && this.currentPage < this.totalPages)
      return true;

    return false;
  }

  nextPage(): void {
    if (this.hasNextPage() && !this.isLastPage()) {
      this.prevPage = this.currentPage;
      this.currentPage += 1;
    }
  }

  resetPage(): void {
    this.currentPage = 0;
    this.totalPages = null;
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  protected handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
