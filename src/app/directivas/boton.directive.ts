import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHoverButton]'
})
export class BotonDirective {
  @Input()colorBase: string;
  @Input('appHoverButton') resaltarColor: string = "rgb(199, 192, 223)";
  
  constructor(private element: ElementRef) 
  {}
 
  @HostListener('mouseenter') onMouseEnter()
  {
    this.resaltar(this.resaltarColor || this.colorBase || 'gray');
  }

  @HostListener('mouseleave') onMouseLeave()
  {
    this.resaltar(null);
  }


  private resaltar(color: string)
  {
    this.element.nativeElement.style.backgroundColor = color;
  }
}
