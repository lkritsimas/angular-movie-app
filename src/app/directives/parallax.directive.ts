import { Directive, ElementRef, HostListener, Renderer2, NgZone } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';
import { tap, map } from 'rxjs/operators';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  initialTop: number = 0;
  ratio: number = 0.12;

  constructor(
    private element: ElementRef,
    private renderer: Renderer2,
    private ngZone: NgZone,
    private ngScrollbar: NgScrollbar
  ) {
    this.initialTop = this.element.nativeElement.getBoundingClientRect().top;

    ngScrollbar.scrolled
      .pipe(
        map((event: any) => (this.initialTop - (event.target.scrollTop * this.ratio))),
        tap((top: number) =>
          this.ngZone.run(() => this.renderer.setStyle(this.element.nativeElement, 'transform', `translate3d(0px, ${top}px, 0px)`))
        )
      ).subscribe();


  }
}
