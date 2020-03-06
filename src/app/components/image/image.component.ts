import { Component, OnInit, Input } from '@angular/core';
import { faFilm, faUser } from '@fortawesome/free-solid-svg-icons';

import { ImageService } from '../../services/image.service';
@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input() url: string;
  @Input() type: string;
  @Input() classList: string[];
  @Input() alt: string = '';
  @Input() size?: string;
  @Input() small?: boolean;
  faFilm = faFilm;
  faUser = faUser;

  constructor(public imageService: ImageService) { }

  ngOnInit(): void {
    this.small = this.small !== undefined;
    this.classList = this.classList !== undefined ? this.classList : [];

    if (this.small && !this.classList.includes('small'))
      this.classList.push('small');
  }
}
