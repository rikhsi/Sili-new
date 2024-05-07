import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'translateList',
  standalone: true,
})
export class TranslateListPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform(keys: string[]): string[] {
    return keys.map((key) => this.translocoService.translate(key));
  }
}
