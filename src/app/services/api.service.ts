import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import { Cv, Skills } from '../store/models/api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http: HttpClient ) { }

  getCVS () {
    return this.http.get<Cv>(`${ environment.urlApi }/cv`);
  }

  getSkills () {
    return this.http.get<Skills[]>(`${ environment.urlApi }/abcategory`);
  }

  getCV ( id:number ) {
    return this.http.get<Cv>(`${ environment.urlApi }/cvs/${id}`);
  }
}
