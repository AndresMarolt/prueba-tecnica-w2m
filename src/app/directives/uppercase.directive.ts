import { Directive, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appUppercase]',
  standalone: true,
})
export class UppercaseDirective {
  private ngControl = inject(NgControl);
  @HostListener('input', ['$event']) onInput(input: HTMLInputElement) {
    const caretPos = input.selectionStart;
    this.ngControl.control!.setValue(input.value.toUpperCase());
    input.setSelectionRange(caretPos, caretPos);
  }
}
