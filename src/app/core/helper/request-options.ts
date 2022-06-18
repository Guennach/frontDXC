import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SpinnerService } from '../../shared/services/spinner.service';
import { UtilsService } from 'src/app/shared/services/utilsService';
import { LoginService } from 'src/app/shared/components/login/login.service';

@Injectable()
export class RequestOptionsInterceptor implements HttpInterceptor {

    constructor(private utilsService: UtilsService, private router: Router
        , private spinnerService: SpinnerService, private loginService: LoginService) { }
    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}');
        if (currentUser && currentUser.token) {
            request = request.clone({
                setHeaders: {
                    'Authorization': `Bearer ${currentUser.token}`
                }
            });
        }

        const httpParams: any = request.params;
        if(httpParams.map) {
            if (new Boolean(httpParams.map.hideSpinner) && new Boolean(httpParams?.map?.get('hideSpinner'))) {
                this.spinnerService.open();
            }
        }
        

        return next.handle(request)
            .pipe(
                tap(event => {
                    if (event instanceof HttpResponse) {
                        this.spinnerService.close();
                    }
                }, error => {
                    this.spinnerService.close();
                })
            );
    }

}
