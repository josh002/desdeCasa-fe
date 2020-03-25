import * as crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

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
export const encryptPass = password => crypto.SHA256(password).toString()

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
    return datetime
}