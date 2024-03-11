import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sili-error',
  templateUrl: './error.component.html',
  styleUrl: './error.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent {

}
