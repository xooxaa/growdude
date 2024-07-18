import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(text: string, limit: number): string {
    return text.length > limit ? `${text.slice(0, limit)}...` : text;
  }
}
