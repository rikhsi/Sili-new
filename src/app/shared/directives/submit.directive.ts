import { Directive, HostListener, input, output } from '@angular/core';

@Directive({
  selector: '[sili-submit]',
  standalone: true
})
export class SubmitDirective {
  stopTrigger = input<boolean>();
  enterTrigger = output<void>();

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyDown(): void {
    this.enterTrigger.emit();
  }
}
