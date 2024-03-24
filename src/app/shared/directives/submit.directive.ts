import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[sili-submit]',
  standalone: true
})
export class SubmitDirective {
  @Input() stopTrigger: boolean;
  @Output() enterTrigger = new EventEmitter<void>();

  @HostListener('document:keydown.enter', ['$event'])
  handleKeyDown() {
    this.enterTrigger.emit();
  }
}
