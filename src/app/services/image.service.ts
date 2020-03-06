import { Injectable } from '@angular/core';

export interface ImageSize {
  person: {
    small: string,
    medium: string,
    large: string
  };
  movie: {
    small: string,
    medium: string,
    large: string
  };
  backdrop: string;
  block: string;
}

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  private baseURL: string = 'https://image.tmdb.org/t/p';
  public sizes: ImageSize = {
    person: {
      small: 'w185_and_h278_face',
      medium: 'w370_and_h556_face',
      large: 'w600_and_h900_face'
    },
    movie: {
      small: 'w185_and_h278_bestv2',
      medium: 'w370_and_h556_bestv2',
      large: 'w600_and_h900_bestv2',
    },
    backdrop: 'w1400_and_h450_face',
    block: 'w1000_and_h563_face'
  };

  constructor() { }

  // Build URL string
  public url(image: string, type: string, size?: string): string {
    const imageSize = size ? this.sizes[type][size] : this.sizes[type];
    return `${this.baseURL}/${imageSize}${image}`;
  }
}
