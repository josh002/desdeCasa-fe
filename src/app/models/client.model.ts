import { datetimeFrontendFormat, datetimeServerFormat } from '../constants/constants'
import * as moment from 'moment';

// COPIADO DE COMMERCE, ADAPTAR A CLIENT!
// export interface CommerceRegister {
//     email: string,
//     cuitCuil: string,
//     password: string,
//     shopName: string,
//     address: string,
//     maxClients: number,
//     phone: number,
//     splitShift: boolean,
//     openTime1: Date | string,
//     closeTime1: Date | string,
//     openTime2?: Date | string,
//     closeTime2?: Date | string,
//     shoppingMinutes: number,
// }

// export const formatCommerce = (commerce: CommerceRegister) => {
//     var newCommerce: CommerceRegister = {
//         email: commerce.email.trim(),
//         cuitCuil: commerce.cuitCuil.trim(),
//         password: commerce.password.trim(),
//         shopName: commerce.shopName.trim(),
//         address: commerce.address.trim(),
//         maxClients: commerce.maxClients,
//         phone: commerce.phone,
//         splitShift: commerce.splitShift,
//         shoppingMinutes: Math.floor(commerce.shoppingMinutes / 10),
//         openTime1: getTime(commerce.openTime1),
//         closeTime1: getTime(commerce.closeTime1),
//         openTime2: commerce.splitShift ? getTime(commerce.openTime2) : undefined,
//         closeTime2: commerce.splitShift ? getTime(commerce.closeTime2) : undefined,
//     };

//     return newCommerce
// }

export class Client {
    id?: number;
    dni: number;
    email: string = '';
    password: string = '';
    firstName: string = '';
    lastName: string = '';
    address: string = '';
    latitude: number;
    longitude: number;
    localidadId?: number;
    phone?: number;
    created?: string | Date | undefined = undefined;
    deleted?: string | Date | null | undefined = undefined;
    resetPasswordToken?: string | undefined = undefined;
    resetPasswordTokenExpires?: string | undefined = undefined;

    constructor(
        client?: Client |
        {
            id?: number | undefined,
            dni: number,
            email: string,
            password: string,
            firstName: string,
            lastName: string,
            address: string,
            latitude: number;
            longitude: number;
            localidadId?: number;
            phone?: number;
            created?: string | Date | undefined,
            deleted?: string | Date | null | undefined,
            resetPasswordToken?: string | undefined,
            resetPasswordTokenExpires?: string | undefined,
        }
    ) {
        this.id = client.id ? client.id : undefined;
        this.dni = client.dni;
        this.email = client.email.trim();
        this.password = client.password.trim();
        this.firstName = client.firstName.trim();
        this.lastName = client.lastName.trim();
        this.address = client.address.trim();
        this.latitude = client.latitude;
        this.longitude = client.longitude;
        this.localidadId = client.localidadId ? client.localidadId : undefined;
        this.phone = client.phone ? client.phone : undefined;
        this.created = client.created ? moment(client.created).format(datetimeFrontendFormat) : undefined;
        this.deleted = client.deleted ? moment(client.deleted).format(datetimeFrontendFormat) : undefined;
        this.resetPasswordToken = client.resetPasswordToken;
        this.resetPasswordTokenExpires = client.resetPasswordTokenExpires;
    }
}
