import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appJsonHeader } from '../constants/constants';
import { Timetable } from '../models/timetable.model';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

    constructor(
        private httpClient: HttpClient,
    ) { }
  
    createTimetable = (timetable: Timetable) => {
        return this.httpClient.post(`${environment.WS_URL}/timetable`, timetable, appJsonHeader).toPromise()
    }

    editTimetable = (timetable: Timetable) => {
        let params = new HttpParams();
        params = params.append('id', `${timetable.id}`);
        return this.httpClient.put(`${environment.WS_URL}/timetable`, timetable, appJsonHeader).toPromise()
    }

    getTimetable = (
        options?: {
            description?: number,
        }
    ) => {
        let params = new HttpParams();
        if (options && options['description']) params = params.append('email', `${options['email']}`);
        return this.httpClient.get(`${environment.WS_URL}/timetable`, { params }).toPromise()
    }

    getTimetableById = (id: number) => {
        let params = new HttpParams();
        params = params.append('id', `${id}`);
        return this.httpClient.get(`${environment.WS_URL}/timetable/${id}`, { params }).toPromise()
    }

    deleteTimetable = (id: number) => {
        let params = new HttpParams();
        params = params.append('id', `${id}`);
        return this.httpClient.delete(`${environment.WS_URL}/timetable`, { params }).toPromise()
    }
    
}
