import { datetimeFrontendFormat, datetimeServerFormat } from '../constants/constants'
import * as moment from 'moment';

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

    format = () => {
        this.email.trim();
        this.password.trim();
        this.firstName.trim();
        this.lastName.trim();
        this.address.trim();
        this.created ? moment(this.created).format(datetimeServerFormat) : undefined;
        this.deleted ? moment(this.deleted).format(datetimeServerFormat) : undefined;
    }
}
