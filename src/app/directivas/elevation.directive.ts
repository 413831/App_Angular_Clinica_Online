import { Directive, ElementRef, HostListener, Input,
         Renderer2, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appElevation]'
})
export class ElevationDirective implements OnChanges{
  @Input() defaultElevation = 2;
  @Input() raisedElevation = 16;

  constructor(private element: ElementRef,private renderer: Renderer2)
  {
    this.setElevation(this.defaultElevation);
  }

  ngOnChanges(_changes: SimpleChanges) 
  {
    // Se detectan cambion de la propiedad defaultElevation
    this.setElevation(this.defaultElevation);
  }

  @HostListener('mouseenter')onMouseEnter() {
    this.setElevation(this.raisedElevation);
  }

  @HostListener('mouseleave')onMouseLeave() {
    this.setElevation(this.defaultElevation);
  }

  setElevation(amount: number)
  {
    // remove all elevation classes
    const classesToRemove = Array.from((<HTMLElement>this.element.nativeElement).classList)
                                      .filter(c => c.startsWith('mat-elevation-z'));
    // Se sacan todas las clases de mat-elevation
    classesToRemove.forEach((c) => {
      this.renderer.removeClass(this.element.nativeElement, c);
    });

    // add the given elevation class
    const newClass = `mat-elevation-z${amount}`;
    this.renderer.addClass(this.element.nativeElement, newClass);
  }

}
