import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { faFilm, faUser } from '@fortawesome/free-solid-svg-icons';

import { ImageService } from '../../services/image.service';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  private _lazy: boolean = false;
  @HostBinding('attr.src') srcAttr = null;
  @Input()
  set lazy(value: boolean) { this._lazy = value !== undefined; };
  get lazy(): boolean { return this._lazy; };
  @Input() src: string;
  @Input() type: string;
  @Input() classList: string[];
  @Input() alt: string = '';
  @Input() size?: string;
  @Input() small?: boolean;
  ratio: string = 'normal';
  faFilm = faFilm;
  faUser = faUser;
  loading: boolean = true;
  removeSpinner: boolean = false;

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
    this.small = this.small !== undefined;
    this.classList = this.classList !== undefined ? this.classList : [];

    this.ratio = this.type === 'block' ? 'block' : 'normal';

    if (this.small && !this.classList.includes('small'))
      this.classList.push('small');
  }

  setImageLoaded() {
    this.loading = false;
    this.removeSpinner = true
  }
}
