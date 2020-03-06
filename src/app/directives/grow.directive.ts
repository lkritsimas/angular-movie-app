// https://stackoverflow.com/a/47492134
import { Directive, OnChanges, Input, HostBinding, ElementRef, Host } from '@angular/core';

@Directive({
  selector: '[appAnimateGrow]',
  host: { '[style.display]': '"block"', '[style.overflow]': '"hidden"' }
})
export class GrowDirective implements OnChanges {
  @Input() appAnimateGrow;
  trigger: boolean;
  startHeight: number;

  constructor(@Host() private element: ElementRef) { }

  @HostBinding('@grow')
  get grow() {
    return { value: this.trigger, params: { startHeight: this.startHeight } };
  }

  setStartHeight() {
    this.startHeight = this.element.nativeElement.clientHeight;
  }

  ngOnChanges(changes) {
    this.setStartHeight();
    this.trigger = !this.trigger;
  }
}
