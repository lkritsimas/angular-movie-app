import { ElementRef, HostBinding, Component, Input, OnChanges, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { faChevronCircleDown, faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';

import { animateGrow } from '../../animations';

@Component({
  selector: 'app-reveal-content',
  templateUrl: './reveal-content.component.html',
  styleUrls: ['./reveal-content.component.scss'],
  animations: [animateGrow]
})
export class RevealContentComponent implements OnInit, AfterViewInit {
  private _maxHeight: number;
  private _currentHeight: number;
  @Input() maxHeight: number;
  state: boolean = false;
  hidden: boolean = false;
  faChevronCircleDown = faChevronCircleDown;
  faChevronCircleUp = faChevronCircleUp;

  constructor(private element: ElementRef, private changeDetectorRef: ChangeDetectorRef) { }

  // Animate on state change
  @HostBinding('@grow') get grow() {
    return { value: this.state, params: { maxHeight: this._maxHeight } };
  }

  ngAfterViewInit() {
    // Get element height
    this._currentHeight = this.element.nativeElement.clientHeight;

    // Hide element if taller than max allowed height
    if (this._currentHeight < this._maxHeight)
      this.hide();
  }

  ngOnInit() {
    this._maxHeight = this.maxHeight;
  }

  hide() {
    this.hidden = true;
    this.changeDetectorRef.detectChanges();
  }

  toggleState() {
    this.state = !this.state;
  }
}
