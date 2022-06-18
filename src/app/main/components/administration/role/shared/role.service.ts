import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/httpService';
import { Role } from './../../../../model/Role';

@Injectable()
export class RoleService {

    constructor( private http: HttpService<Role>) { }

    public getAll() {
        return this.http.get(`/role/all`);
    }

    public get(id: number) {
        return this.http.get(`/role/${id}`);
      }

    public save(role: any) {
        return this.http.post(`/role/saveOrUpdate`, role);
    }

    public delete(id: number) {
        return this.http.delete(`/role/delete/${id}`);
    }

}
