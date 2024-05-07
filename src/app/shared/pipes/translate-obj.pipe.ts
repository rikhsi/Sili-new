import { Pipe, PipeTransform } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Pipe({
  name: 'translateObj',
  standalone: true,
})
export class TranslateObjPipe implements PipeTransform {
  constructor(private translocoService: TranslocoService) {}

  transform<T>(value: T, atr: string): T {
    value[atr] = value[atr].map((key: string) => this.translocoService.translate(key));

    return value;
  }
}
