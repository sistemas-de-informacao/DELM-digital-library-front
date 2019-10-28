import { Directive, Renderer2, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appTableHover]'
})
export class TableHoverDirective {

  constructor(private renderer: Renderer2, private element: ElementRef) {
    this.renderer.setStyle(element.nativeElement, 'cursor', 'pointer');
  }

  @HostListener('mouseover')
  onMouseenter() {
    this.mouse('#595959');
  }

  @HostListener('mouseout')
  onMouseLeave() {
    this.mouse('#505050');
  }

  private mouse(el: string) {
    this.renderer.setStyle(this.element.nativeElement, 'background', el);
  }

}
