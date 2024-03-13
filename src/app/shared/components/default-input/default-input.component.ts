import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sili-default-input',
  standalone: true,
  imports: [],
  templateUrl: './default-input.component.html',
  styleUrl: './default-input.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultInputComponent {

}
