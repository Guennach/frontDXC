import { Injectable } from '@angular/core';
import { Setting } from 'src/app/main/model/setting';
import { HttpService } from '../../../../../shared/services/httpService';


@Injectable({
    providedIn: 'root'
})
export class SettingService {

    constructor(private http: HttpService<Setting>) { }

    public getAll() {
        return this.http.get(`/setting/all`);
    }

    public get(id: number) {
        return this.http.get(`/setting/${id}`);
    }

    public save(setting: any) {
        return this.http.post(`/setting/saveOrUpdate`, setting);
    }

    public delete(id: number) {
        return this.http.delete(`/setting/delete/${id}`);
    }

}
