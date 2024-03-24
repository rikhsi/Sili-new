import { NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CUSTOM_ICONS_TYPE, ICONS_CURSOR_TYPE, NZ_ICONS_TYPE } from 'src/app/typings';
import { NzFlexModule } from 'ng-zorro-antd/flex';

@Component({
  selector: 'sili-svg-icon',
  standalone: true,
  imports: [NzIconModule, NgStyle, NzFlexModule],
  template: `
    <div 
          nz-flex 
          [nzVertical]="false"
          [nzGap]="gap"
          [nzAlign]="'center'"
          [nzJustify]="'center'"
          [ngStyle]="{ cursor }"
          (click)="clicked.emit()"
      >
      <span 
          nz-icon 
          [nzType]="name" 
          [ngStyle]="{ 
              fontSize: size + 'px', 
              color 
          }">
      </span>
      
      <ng-content></ng-content>
    </div>
  `,
  styles:`
    :host {
      width: fit-content;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgIconComponent {
  @Input() size: number;
  @Input() color: string;
  @Input() name: CUSTOM_ICONS_TYPE | NZ_ICONS_TYPE;
  @Input() gap: number;
  @Input() cursor: ICONS_CURSOR_TYPE = 'inherit';

  @Output() clicked = new EventEmitter<void>();
}
