import { datetimeFrontendFormat, datetimeServerFormat, getTime } from '../constants/constants'
import * as moment from 'moment';
import { Client } from './client.model';
import { Timetable } from './timetable.model';

export interface BookingRegister {
    userId: number;
    commerceId: number;
    timetableId: number;
}

export class Booking {
    id: number;
    userId: number;
    timetableId: number;
    commerceId: number;
    created: Date | string;
    description: string;
    shopName: string;
    address: string;
    phone: number;
    constructor(
        booking?: Booking |
        {
            id: number;
            userId: number;
            timetableId: number;
            commerceId: number;
            created: Date | string;
            description: string;
            shopName: string;
            address: string;
            phone: number;
        }
    ) {
        this.id = +booking.id;
        this.userId = +booking.userId;
        this.timetableId = +booking.timetableId;
        this.commerceId = +booking.commerceId;
        this.created = new Date(booking.created);
        this.description = booking.description.trim();
        this.shopName = booking.shopName.trim();
        this.address = booking.address.trim();
        this.phone = +booking.phone;
    }
}
