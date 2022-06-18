import { LoginService } from './../components/login/login.service';
import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[hasAnyAuthority]'
})
export class HasAnyAuthorityDirective {

  constructor(private element: ElementRef , private loginService: LoginService) {}

  @Input()
  set hasAnyAuthority(authorities: string) {

      /*Utilisation
          <element hasAnyAuthority="ADMINISTRATION, MODERATION"></element>
       */

    // Cacher l'élément si les autorisations ne correspont pas a celles de l'user connecté
    const hasAutority = this.loginService.hasAnyAutority(authorities);
    if (!hasAutority) {
      this.element.nativeElement.remove();
    }
  }
}
