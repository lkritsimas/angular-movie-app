import { Pipe, PipeTransform } from '@angular/core';
import { SafeHtml, DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'paragraph'
})
export class ParagraphPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }

  transform(value: string): SafeHtml {
    value = value.replace(/(.+[^\n]*)+/g, '<p>$1</p>')
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
