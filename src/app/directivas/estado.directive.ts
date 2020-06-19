import { Directive,ElementRef, HostListener, Input, Renderer2} from '@angular/core';

@Directive({
  selector: '[appEstado]'
})
export class EstadoDirective {
  @Input('appEstado') texto: string = "TEST";

  constructor(private renderer: Renderer2,private element: ElementRef) 
  {
    this.marcarEstado(this.texto);
    
  }

  @HostListener('mouseenter') onMouseEnter()
  {
    
  }

  private marcarEstado(texto : string){
  }


  

}
