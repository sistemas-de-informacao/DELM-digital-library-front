import { LocalStorageService } from './../services/local-storage.service';
import { Directive, Renderer2, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighPermissions]'
})
export class HighPermissionsDirective {

  constructor(private renderer: Renderer2, private element: ElementRef, private localStorageService: LocalStorageService) {
    this.localStorageService.getPermissao() !== 'ADMINISTRADOR'
      ? this.renderer.setStyle(element.nativeElement, 'visibility', 'hidden')
      : this.renderer.setStyle(element.nativeElement, 'visibility', 'show');
  }

}
