import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    if (value === undefined || !value.length) return value;

    const limit = args.length > 0 ? parseInt(args[0], 10) : 255;
    const elipsis = args.length > 1 ? args[1] : '...';

    if (limit < 1) return value;

    let truncatedText = value.substr(0, limit);
    truncatedText = value.substr(0, truncatedText.lastIndexOf('\n'));
    truncatedText = value.substr(0, truncatedText.lastIndexOf('.'));

    return value.length > limit ? `${truncatedText}${elipsis}` : value;
  }
}
