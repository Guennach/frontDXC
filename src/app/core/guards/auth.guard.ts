import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/shared/components/login/login.service';
import { Autorities } from './authorities';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private loginService: LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (localStorage.getItem('currentUser')) {
            // logged in so return true
            window.scroll(0, 0);

            //Vérifier si l'USER a le droit d'accès a cet URL
            let routeAutorities = Autorities.AUTORITIES_MAP.get(this.getUrlContext(state.url.substr(1)));
            if (!this.loginService.checkPermissionToAccess(routeAutorities)) {
                if (state.url !== "not-authorized") {
                    this.router.navigate(['/not-authorized']);
                }
            }

            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    getUrlContext(url) {
        let length = url.indexOf("/") > -1 ? url.indexOf("/") : url.length;
        return url.substring(0, length);
    }
}
