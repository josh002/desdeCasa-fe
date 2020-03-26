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
        if (options && options['userId']) params = params.append('email', `${options['email']}`);
        if (options && options['timetableId']) params = params.append('shopName', `${options['shopName']}`);
        if (options && options['commerceId']) params = params.append('latitude', `${options['latitude']}`);
        if (options && options['created']) params = params.append('longitude', `${options['longitude']}`);
        return this.httpClient.get(`${environment.WS_URL}/booking`, { params }).toPromise()
    }

    getBookingById = (id: number) => {
        let params = new HttpParams();
        params = params.append('id', `${id}`);
        return this.httpClient.get(`${environment.WS_URL}/booking/${id}`, { params }).toPromise()
    }

    deleteBooking = (id: number) => {
        let params = new HttpParams();
        params = params.append('id', `${id}`);
        return this.httpClient.delete(`${environment.WS_URL}/booking`, { params }).toPromise()
    }
    
}