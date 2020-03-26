import * as crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';

/**
 * Formato global para el datetime que debe ir a la Database
 */
export const datetimeServerFormat = 'YYYY-MM-DD HH:mm:ss';

/**
 * Formato global para el datetime que debe ir a la Database
 */
export const datetimeFrontendFormat = 'YYYY-MM-DDTHH:mm:ss';

/**
 * Encripta un password en sha256
 * @param {*} password 
 */
export const encryptPass = (password) => crypto.SHA256(password).toString()

/**
* Constructor del header para HTTP Requests
*/
export const appJsonHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', })
}

export const getTime = (datetime: string | Date) => {
    if (typeof datetime === 'string') datetime = new Date(datetime);

    if (datetime instanceof Date) {
        datetime = `${datetime.getHours()}:${datetime.getMinutes()}`
    } else {
        console.log('the getTime() conversion wasnt neither string neither Date type');
    }
    // Agregar un chequeo de isNan() por si el string no tiene el formato Correcto;
    return datetime
}

/**
* Transforma un string HH:mm en un objeto Date
* @param {string} time - HH:mm recibido del backend
*/
export const asDate = (time: string | Date) =>
    new Date(moment(time, "HH:mm").toISOString());