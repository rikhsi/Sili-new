import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ICONS_CURSOR_TYPE, ICONS_TYPE } from 'src/app/typings';

@Component({
  selector: 'sili-svg-icon',
  standalone: true,
  imports: [NzIconModule, NgStyle, NzFlexModule],
  template: `
    <div
      nz-flex
      [nzVertical]="false"
      [nzGap]="gap()"
      [nzAlign]="'center'"
      [nzJustify]="'center'"
      [ngStyle]="{ cursor: cursor() }"
      (click)="clicked.emit()"
    >
      <span
        nz-icon
        [attr.aria-label]="ariaLabel()"
        [nzType]="name()"
        [ngStyle]="{
          fontSize: size() + 'px',
          color: color()
        }"
      >
      </span>

      <ng-content></ng-content>
    </div>
  `,
  styles: `
    :host {
      width: fit-content;
      user-select: none;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SvgIconComponent {
  size = input<number>();
  color = input<string>();
  name = input<ICONS_TYPE>();
  gap = input<number>();
  cursor = input<ICONS_CURSOR_TYPE>('inherit');
  ariaLabel = input<string>();
  clicked = output<void>();
}
