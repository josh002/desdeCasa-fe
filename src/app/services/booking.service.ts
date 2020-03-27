import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { appJsonHeader } from '../constants/constants';
import { Booking, BookingRegister } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

    constructor(
        private httpClient: HttpClient,
    ) { }
  
    createBooking = (booking: BookingRegister) => {
        return this.httpClient.post(`${environment.WS_URL}/booking`, booking, appJsonHeader).toPromise()
    }

    editBooking = (booking: Booking) => {
        let params = new HttpParams();
        params = params.append('id', `${booking.id}`);
        return this.httpClient.put(`${environment.WS_URL}/booking`, booking, appJsonHeader).toPromise()
    }

    getBooking = (
        options?: {
            considerDeletes?: boolean,
            userId?: number,
            timetableId?: number,
            commerceId?: number,
            created?: Date | string,
        }
    ) => {
        let params = new HttpParams();
        if (options && options['considerDeletes']) params = params.append('considerDeletes', `${options['considerDeletes']}`);
        if (options && options['userId']) params = params.append('userId', `${options['userId']}`);
        if (options && options['timetableId']) params = params.append('timetableId', `${options['timetableId']}`);
        if (options && options['commerceId']) params = params.append('commerceId', `${options['commerceId']}`);
        if (options && options['created']) params = params.append('created', `${options['created']}`);
        return this.httpClient.get(`${environment.WS_URL}/booking`, { params }).toPromise()
    }

    getBookingById = (id: number) => {
        let params = new HttpParams();
        params = params.append('id', `${id}`);
        return this.httpClient.get(`${environment.WS_URL}/booking/${id}`, { params }).toPromise()
    }

    getBookingDayShifts = (commerceId: number, created: string) => {
        let params = new HttpParams();
        params = params.append('commerceId', `${commerceId}`);
        params = params.append('created', `${created}`);
        return this.httpClient.get(`${environment.WS_URL}/booking-day-shifts`, { params }).toPromise()
    }

    deleteBooking = (id: number) => {
        return this.httpClient.delete(`${environment.WS_URL}/booking/${id}`).toPromise()
    }
    
}
