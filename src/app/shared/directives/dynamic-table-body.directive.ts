import { Directive, Input, ElementRef } from '@angular/core';
import { TranslationService } from '../services/translationService';

@Directive({
  selector: '[dynamicTableBody]'
})
export class DynamicTableBodyDirective {
   cell;
  constructor(private element: ElementRef , private translationService:TranslationService) {}

  @Input()
  set dynamicTableBody(config: any) {
    for(let i in config.property) {
       this.cell = document.createElement("td");
        const textToAdd = document.createTextNode(config.componentName+'.'+config.property[i]);
        this.cell.appendChild(textToAdd);
        this.element.nativeElement.appendChild(this.cell);
    }
    
  }
}
