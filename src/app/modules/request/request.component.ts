import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sili-request',
  templateUrl: './request.component.html',
  styleUrl: './request.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestComponent {}
