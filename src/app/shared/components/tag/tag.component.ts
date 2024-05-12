import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { TranslocoPipe } from '@ngneat/transloco';
import { NzTagComponent } from 'ng-zorro-antd/tag';
import { STATUS, STATUS_COLOR, STATUS_ICON } from 'src/app/constants';
import { NZ_ICONS_TYPE, TagType } from 'src/app/typings';

import { SvgIconComponent } from '../svg-icon/svg-icon.component';

@Component({
  selector: 'sili-tag',
  standalone: true,
  imports: [NzTagComponent, SvgIconComponent, TranslocoPipe],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagComponent<T> {
  type = input<TagType>();
  value = input<T>();
  statusColor = computed<string>(() => this.defineStatusColorType());
  statusIcon = computed<NZ_ICONS_TYPE>(() => this.defineStatusIconType());
  statusText = computed<string>(() => this.defineStatusText());

  private defineStatusColorType(): string {
    if (this.type() === 'status') {
      return STATUS_COLOR[this.value()];
    }

    return STATUS_COLOR[this.defineCheckStatusField()];
  }

  private defineStatusIconType(): NZ_ICONS_TYPE {
    if (this.type() === 'status') {
      return STATUS_ICON[this.value()];
    }

    return STATUS_ICON[this.defineCheckStatusField()];
  }

  private defineCheckStatusField(): string {
    return this.value() ? 'active' : 'inactive';
  }

  private defineStatusText(): string {
    if (this.type() === 'checkStatus') {
      return this.value() ? STATUS.active : STATUS.inactive;
    }

    return ('status.' + this.value()) as string;
  }
}
