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
    latitude?: number;
    longitude?: number;
    localidadId?: number;
    phone?: number;
    created?: Date | undefined = undefined;
    deleted?: Date | null | undefined = undefined;
    resetPasswordToken?: string | undefined = undefined;
    resetPasswordTokenExpires?: string | undefined = undefined;

    // constructor(
    //     sapId: number | SapId |
    //     {
    //         id?: number | undefined,
    //         sapId: string,
    //         userId: number;
    //         cuitCuil: string,
    //         created?: Date | undefined,
    //         deleted?: Date | null | undefined,
    //         description?: string | undefined,
    //     }
    // ) {
    //     if (typeof (sapId) != 'number') {
    //         this.id = (sapId.id) ? sapId.id : undefined;
    //         this.sapId = sapId.sapId.trim();
    //         this.userId = sapId.userId;
    //         this.cuitCuil = sapId.cuitCuil.trim();
    //         this.created = (sapId.created) ? moment(sapId.created).format(datetimeFrontendFormat) : undefined;
    //         this.deleted = (sapId.deleted) ? moment(sapId.deleted).format(datetimeFrontendFormat) : undefined;
    //         this.description = sapId.description ? sapId.description.trim() : undefined;
    //     } else {
    //         // En este caso sapId contiene el user Id al que pertenece
    //         this.userId = +sapId;
    //     }
    // }

    // format = (sapId: SapId) =>
    //     new SapId({
    //         id: sapId.id,
    //         sapId: sapId.sapId.trim(),
    //         userId: +sapId.userId,
    //         cuitCuil: sapId.cuitCuil.trim(),
    //         deleted: sapId.deleted ? moment(sapId.deleted).format(datetimeServerFormat) : undefined,
    //         description: sapId.description ? sapId.description.trim() : undefined
    //     })
}
