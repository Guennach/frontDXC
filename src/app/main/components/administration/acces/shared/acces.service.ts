import { Injectable } from '@angular/core';
import { HttpService } from '../../../../../shared/services/httpService';
import { Acces } from 'src/app/main/model/Acces';

@Injectable()
export class AccesService {

    constructor( private http: HttpService<Acces>) { }

    public getAll() {
        return this.http.get(`/acces/all`);
    }

    public getAllByMapId(mapId) {
        return this.http.get(`/acces/all/${mapId}`);
    }
    
    public get(id: number) {
        return this.http.get(`/acces/${id}`);
      }

}
