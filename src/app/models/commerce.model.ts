import { datetimeFrontendFormat, datetimeServerFormat, getTime } from '../constants/constants'
import * as moment from 'moment';

export interface CommerceRegister {
    id?: number,
    latitude?: number,
    longitude?: number,
    email: string,
    cuitCuil: string,
    password: string,
    shopName: string,
    address: string,
    maxClients: number,
    phone: number,
    splitShift: boolean,
    openTime1: Date | string,
    closeTime1: Date | string,
    openTime2?: Date | string,
    closeTime2?: Date | string,
    shoppingMinutes: number,
}

export const formatCommerce = (commerce: CommerceRegister | Commerce) => {
    var newCommerce: CommerceRegister = {
        id: commerce.id ? commerce.id : undefined,
        latitude: commerce.latitude ? commerce.latitude : undefined,
        longitude: commerce.longitude ? commerce.longitude : undefined,
        email: commerce.email.trim(),
        cuitCuil: commerce.cuitCuil.trim(),
        password: commerce.password.trim(),
        shopName: commerce.shopName.trim(),
        address: commerce.address.trim(),
        maxClients: commerce.maxClients,
        phone: commerce.phone,
        splitShift: commerce.splitShift,
        shoppingMinutes: Math.floor(commerce.shoppingMinutes / 10),
        openTime1: getTime(commerce.openTime1),
        closeTime1: getTime(commerce.closeTime1),
        openTime2: commerce.splitShift ? getTime(commerce.openTime2) : undefined,
        closeTime2: commerce.splitShift ? getTime(commerce.closeTime2) : undefined,
    };

    return newCommerce
}

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
    openTime1: Date | string;
    closeTime1: Date | string;
    openTime2?: Date | string;
    closeTime2?: Date | string;
    shoppingMinutes: number;
    created?: string | Date | undefined = undefined;
    deleted?: string | Date | null | undefined = undefined;
    resetPasswordToken?: string | undefined = undefined;
    resetPasswordTokenExpires?: string | undefined = undefined;


    constructor(
        commerce?: Commerce |
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
            openTime1: Date | string,
            closeTime1: Date | string,
            openTime2?: Date | string,
            closeTime2?: Date | string,
            shoppingMinutes: number,
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
}
