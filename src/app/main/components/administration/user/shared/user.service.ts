import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/httpService';
import { User } from '../../../../model/User';


@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpService<User>) { }

    public getAll() {
        return this.http.get(`/user/all`);
    }

    changeEmail(profilFormChangeEmail) {
        return this.http.post(`/user/updateEmail`, profilFormChangeEmail);

    }

    changePassword(profilFormChangePassword) {
        return this.http.post(`/user/updatePassword`, profilFormChangePassword);

    }

    public get(id: number) {
        return this.http.get(`/user/${id}`);
    }

    getAllByFilter(uilisateur: any) {
        return this.http.post(`/user/search`, uilisateur);
    }

    public save(uilisateur: any) {
        return this.http.post(`/user/saveOrUpdate`, uilisateur);
    }

    public delete(id: number) {
        return this.http.delete(`/user/delete/${id}`);
    }

}
