import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  private _show: boolean;
  @Input() overlay: boolean;
  @Input() destroy: boolean = false;
  @Input()
  set show(show: boolean) { this._show = show; }
  get show(): boolean { return this._show; }

  constructor() { }

  ngOnInit(): void {
    this._show = this._show !== undefined;
    this.overlay = this.overlay !== undefined;
  }
}
