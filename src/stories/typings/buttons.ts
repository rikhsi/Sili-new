import { NzButtonType } from 'ng-zorro-antd/button';
import { NzSizeLDSType } from 'ng-zorro-antd/core/types';
import { NzTooltipTrigger } from 'ng-zorro-antd/tooltip';

export type DefaultButton = {
  size: NzSizeLDSType;
  danger: boolean;
  blocked: boolean;
  ghost: boolean;
  loading: boolean;
  mode: NzButtonType;
  block?: boolean;
};

export interface CircleButton extends DefaultButton {
  ariaLabel: string;
  tooltipText: string;
  tooltipTrigger: NzTooltipTrigger;
  tooltipArrow: boolean;
  tooltipMouseEnterDelay: number;
  isTooltip: boolean;
}
