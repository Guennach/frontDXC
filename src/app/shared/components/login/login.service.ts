import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {GlobalConstant} from '../../../core/app.constants';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';
import { UtilsService } from '../../services/utilsService';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class LoginService {
    public conditionEvent =  new EventEmitter<boolean>();
    public logOutEvent =  new EventEmitter<boolean>();
    public closeModalEvent =  new EventEmitter<boolean>();
    nbrWatcher =0;
   
      
    constructor(private http: HttpClient, private toastr: ToastrService, private utilsService: UtilsService) { }

    login(login: string, password: string){
        return this.http.post(GlobalConstant.ROOT_URL + '/login', { login: login, pwd: password })
            .pipe(map((res: any) => {
                const user = res.user;
                const token = res.token;
                if (token) {
                    localStorage.setItem('currentUser', JSON.stringify({ user : user, token: token }));
                } else {
                    this.toastr.error(res.message);
                }
            }));
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('currentUser')||'{}').user;
    }

    getCurrentUserAccess() {
        return this.getCurrentUser().accesses;
    }

    getMode() {
        return localStorage.getItem('environnementMode');
    }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('environnementMode');
        localStorage.setItem('nbrInstance', "0");
    }

    hasAnyAutority(authorities: string) {
        const userAuthorities: string[] = this.getCurrentUserAccess();
        const checkeAuthorities: string[] = authorities.split(',');
        let result = false;
        for (const aut of checkeAuthorities) {
            if (userAuthorities.indexOf(aut) !== -1 ) {
                result = true;
            }
        }
        return result;
    }

    checkPermissionToAccess(routeAutorities) {
        let result = true;
        if (routeAutorities) {
            if (!this.hasAnyAutority(routeAutorities.join(","))) {
                result = false;
            }
        }
        return result;
    }
}
