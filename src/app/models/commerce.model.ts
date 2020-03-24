import { datetimeFrontendFormat, datetimeServerFormat } from '../constants/constants'
import { Time } from '@angular/common';
import * as moment from 'moment';

export class Commerce {
    id: number | undefined;
    email: string = '';
    cuitCuil: string = '';
    password: string = '';
    shopName: string = '';
    address: string = '';
    latitude: number;
    longitude: number;
    maxClients: number;
    phone: number;
    phone_secondary?: number;
    splitShift: boolean = false;
    openTime1: Time;
    closeTime1: Time;
    openTime2?: Time;
    closeTime2?: Time;
    shoppingMinutes?: number;
    created?: string | Date | undefined = undefined;
    deleted?: string | Date | null | undefined = undefined;
    resetPasswordToken?: string | undefined = undefined;
    resetPasswordTokenExpires?: string | undefined = undefined;


    constructor(
        commerce: Commerce |
        {
            id?: number | undefined,
            email: string,
            cuitCuil: string,
            password: string,
            shopName: string,
            address: string,
            latitude: number;
            longitude: number,
            maxClients: number,
            phone: number,
            phone_secondary?: number,
            splitShift: boolean,
            openTime1: Time,
            closeTime1: Time,
            openTime2?: Time,
            closeTime2?: Time,
            shoppingMinutes?: number,
            created?: string | Date | undefined,
            deleted?: string | Date | null | undefined,
            resetPasswordToken?: string | undefined,
            resetPasswordTokenExpires?: string | undefined,
        }
    ) {
        this.id = commerce.id;
        this.email = commerce.email.trim();
        this.cuitCuil = commerce.cuitCuil.trim();
        this.password = commerce.password.trim();
        this.shopName = commerce.shopName.trim();
        this.address = commerce.address.trim();
        this.latitude = commerce.latitude;
        this.longitude = commerce.longitude;
        this.maxClients = commerce.maxClients;
        this.phone = commerce.phone;
        this.phone_secondary = commerce.phone_secondary ? commerce.phone_secondary : undefined;
        this.splitShift = commerce.splitShift;
        this.openTime1 = commerce.openTime1;
        this.closeTime1 = commerce.closeTime1;
        this.openTime2 = commerce.openTime2 ? commerce.openTime2 : undefined;
        this.closeTime2 = commerce.closeTime2 ? commerce.closeTime2 : undefined;
        this.shoppingMinutes = commerce.shoppingMinutes ? commerce.shoppingMinutes : undefined;
        this.created = commerce.created ? moment(commerce.created).format(datetimeFrontendFormat) : undefined;;
        this.deleted = commerce.deleted ? moment(commerce.deleted).format(datetimeFrontendFormat) : undefined;;
        this.resetPasswordToken = commerce.resetPasswordToken;
        this.resetPasswordTokenExpires = commerce.resetPasswordTokenExpires;
    }
    
    format = () => {
        this.email.trim();
        this.cuitCuil.trim();
        this.password.trim();
        this.shopName.trim();
        this.address.trim();
        this.created ? moment(this.created).format(datetimeServerFormat) : undefined;
        this.deleted ? moment(this.deleted).format(datetimeServerFormat) : undefined;
    }
}
