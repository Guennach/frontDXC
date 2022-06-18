import { Directive, Input, ElementRef } from '@angular/core';
import { TranslationService } from '../services/translationService';

@Directive({
  selector: '[dynamicTableHead]'
})
export class DynamicTableHeadDirective {
   cell;
  constructor(private element: ElementRef, private translationService:TranslationService) {}

  @Input()
  set dynamicTableHead(config: any) {
    for(let i in config.property) {
       this.cell = document.createElement("th");
        const textToAdd = document.createTextNode(this.translationService.getMessage(config.componentName.toUpperCase()+'.'+config.property[i].toUpperCase()));
        this.cell.appendChild(textToAdd);
        this.element.nativeElement.appendChild(this.cell);
    }
    const newthead = document.createElement("th");
        const text = document.createTextNode(this.translationService.getMessage('GLOBAL.ACTIONS'));
        newthead.appendChild(text);
        this.element.nativeElement.appendChild(newthead);
    
  }
}
