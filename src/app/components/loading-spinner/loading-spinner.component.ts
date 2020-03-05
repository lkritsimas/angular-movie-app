import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input() show: boolean;
  @Input() overlay: boolean;

  constructor() { }

  ngOnInit(): void {
    this.show = this.show !== undefined;
    this.overlay = this.overlay !== undefined;
  }

}
