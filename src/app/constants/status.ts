import { NzStatusColor } from 'ng-zorro-antd/core/color';

import { NZ_ICONS_TYPE } from '../typings';

export enum STATUS {
  new = 'status.new',
  processing = 'status.processing',
  refusal = 'status.refusal',
  completed = 'status.completed',
}

export const STATUS_COLOR: { [key in keyof typeof STATUS]: NzStatusColor } = {
  new: 'warning',
  processing: 'processing',
  refusal: 'error',
  completed: 'success',
};

export const STATUS_ICON: { [key in keyof typeof STATUS]: NZ_ICONS_TYPE } = {
  new: 'exclamation-circle',
  processing: 'sync',
  refusal: 'close-circle',
  completed: 'check-circle',
};
