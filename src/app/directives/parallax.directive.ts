import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appParallax]'
})
export class ParallaxDirective {
  initialTop: number = 0;
  ratio: number = 0.12;

  constructor(private element: ElementRef, private renderer: Renderer2) {
    this.initialTop = this.element.nativeElement.getBoundingClientRect().top;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const top = (this.initialTop - (window.scrollY * this.ratio));
    this.renderer.setStyle(this.element.nativeElement, 'transform', `translate3d(0px, ${top}px, 0px)`)
  }
}
