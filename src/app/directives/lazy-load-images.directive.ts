// Source: https://github.com/jesusbotella/ngx-lazy-load-images
// Fixed for Angular 9
import { Directive, ElementRef, Input, NgZone, Renderer2, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[lazyLoadImages]'
})
export class LazyLoadImagesDirective implements OnInit, OnDestroy {
  @Input('lazyLoadImages') intersectionObserverConfig: Object;

  intersectionObserver: IntersectionObserver;
  rootElement: HTMLElement;

  constructor(
    element: ElementRef,
    public renderer: Renderer2,
    public ngZone: NgZone
  ) {
    this.rootElement = element.nativeElement;
  }

  init() {
    this.registerIntersectionObserver();

    this.observeDOMChanges(this.rootElement, () => {
      const imagesFoundInDOM = this.getAllImagesToLazyLoad(this.rootElement);
      imagesFoundInDOM.forEach((image: HTMLElement) => {
        this.intersectionObserver.observe(image)
      });
    });
  }

  ngOnInit() {
    this.ngZone.runOutsideAngular(() => this.init());
  }

  ngOnDestroy() {
    if (this.intersectionObserver) {
      this.intersectionObserver.disconnect();
    }
  }

  registerIntersectionObserver() {
    this.intersectionObserver = new IntersectionObserver(
      images => images.forEach(image => this.onIntersectionChange(image)),
      this.intersectionObserverConfig instanceof Object ? this.intersectionObserverConfig : undefined
    );

    return this.intersectionObserver;
  }

  observeDOMChanges(rootElement: HTMLElement, onChange: Function) {
    // Create a Mutation Observer instance
    const observer = new MutationObserver(mutations => onChange(mutations));

    // Observer Configuration
    const observerConfig = {
      attributes: true,
      characterData: true,
      childList: true,
      subtree: true
    };

    // Observe Directive DOM Node
    observer.observe(rootElement, observerConfig);

    // Fire onChange callback to check current DOM nodes
    onChange();

    return observer;
  }

  getAllImagesToLazyLoad(pageNode: HTMLElement) {
    return Array.from(pageNode.querySelectorAll('img[data-src], [data-srcset], [data-background-src]'));
  }

  onIntersectionChange(image: any) {
    if (!image.isIntersecting) {
      return;
    }

    this.onImageAppearsInViewport(image.target);
  }

  onImageAppearsInViewport(image: any) {
    console.log('image', image.dataset);
    if (image.dataset.src) {
      this.renderer.setAttribute(image, 'src', image.dataset.src);
      this.renderer.removeAttribute(image, 'data-src');
    }

    if (image.dataset.srcset) {
      this.renderer.setAttribute(image, 'srcset', image.dataset.srcset);
      this.renderer.removeAttribute(image, 'data-srcset');
    }

    if (image.dataset.backgroundSrc) {
      this.renderer.setStyle(image, 'background-image', `url(${image.dataset.backgroundSrc})`);
      this.renderer.removeAttribute(image, 'data-background-src');
    }

    // Stop observing the current target
    if (this.intersectionObserver) {
      this.intersectionObserver.unobserve(image);
    }
  }
}
