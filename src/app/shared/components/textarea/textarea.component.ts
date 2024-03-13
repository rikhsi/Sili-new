import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sili-textarea',
  standalone: true,
  imports: [],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.less',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextareaComponent {

}
