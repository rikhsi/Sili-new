import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sili-default-button',
  standalone: true,
  imports: [],
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DefaultButtonComponent {

}
