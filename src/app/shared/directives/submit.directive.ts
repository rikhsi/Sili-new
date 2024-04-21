import { Directive, HostListener, input, output } from '@angular/core';

@Directive({
  selector: '[siliSubmit]',
  standalone: true,
})
export class SubmitDirective {
  stopTrigger = input<boolean>();
  enterTrigger = output<void>();

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyDown(): void {
    this.enterTrigger.emit();
  }
}
