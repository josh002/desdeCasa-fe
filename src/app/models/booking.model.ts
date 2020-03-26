import { datetimeFrontendFormat, datetimeServerFormat, getTime } from '../constants/constants'
import * as moment from 'moment';

export interface BookingRegister {
    userId: number;
    commerceId: number;
    timetableId: number;
}

export class Booking {
    id: number;
    userId: number;
    commerceId: number;
    timetableId: number;
    created: Date | string;
    constructor(
        booking?: Booking |
        {
            id: number;
            userId: number;
            commerceId: number;
            timetableId: number;
            created: Date | string
        }
    ) {
        this.id = booking.id;
        this.userId = booking.userId;
        this.commerceId = booking.commerceId;
        this.timetableId = booking.timetableId;
        this.created = booking.created;
    }
}
