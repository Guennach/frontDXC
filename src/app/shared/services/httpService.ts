import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { GlobalConstant } from '../../core/app.constants';



@Injectable()

export class HttpService<T> {

    constructor(private http: HttpClient) { }

    private hideSpinner(hideSpinner) {
        return hideSpinner ? {hideSpinner: 'true'} : {hideSpinner: 'false'};
    }

    public get<T>(url: string , hideSpinner?: boolean): Observable<T> {
        return this.http.get<T>(GlobalConstant.ROOT_URL + url, {params: this.hideSpinner(hideSpinner)});
    }

    public post<T>(url: string, object: any, hideSpinner?: boolean): Observable<T> {
        return this.http.post<T>(GlobalConstant.ROOT_URL + url, object, {params: this.hideSpinner(hideSpinner)});
    }

    public put<T>(url: string, object: any, hideSpinner?: boolean): Observable<T> {
        return this.http.put<T>(GlobalConstant.ROOT_URL + url, object, {params: this.hideSpinner(hideSpinner)});
    }

    public delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(GlobalConstant.ROOT_URL + url);
    }

}
