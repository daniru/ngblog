import { Directive, OnInit, Input, ElementRef, HostListener, RendererV2 } from '@angular/core';
import * as Clipboard from 'clipboard';
import { File } from '../models/file';

@Directive({
  selector: '[drClipboard]'
})
export class ClipboardDirective  {

  @Input() file: File;
  private _button: any;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this._button) {
      this._button = this._renderer.createElement('button');
      this._button.innerHTML = 'copy';
      this._button.className = 'copybutton mat-accent mat-raised-button';
      this._element.nativeElement.append(this._button);
      this._renderer.listen(this._button, 'click', () => { this._copyToClipboard(); return true; });
    } else {
      this._button.className = 'copybutton mat-accent mat-raised-button';
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this._button) {
      this._button.className = 'hiddenbutton';
    }
  }

  constructor(private _element: ElementRef, private _renderer: RendererV2) {
  }

  private _copyToClipboard() {
    const clipboard = new Clipboard(this._element.nativeElement, { text: () => this.file.content });
    clipboard.on('success', (e) => { clipboard.destroy(); });
  }
}
