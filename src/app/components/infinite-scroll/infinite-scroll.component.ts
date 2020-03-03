// Credit: Netanel Basal @ https://netbasal.com/build-an-infinite-scroll-component-in-angular-a9c16907a94d
import { Component, OnDestroy, Input, Output, ViewChild, ElementRef, EventEmitter, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll',
  templateUrl: './infinite-scroll.component.html',
  styleUrls: ['./infinite-scroll.component.scss']
})
export class InfiniteScrollComponent implements AfterViewInit, OnDestroy {
  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor') anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) { }

  get element() {
    return this.host.nativeElement;
  }

  ngAfterViewInit() {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit('scrolled');
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
}
