import * as crypto from 'crypto-js';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';
import * as moment from 'moment';
import * as numeral from 'numeral';
// const numeral = require('numeral');
// const numerals = require('numeral')

export const welcomeText = `
<h3 style="eon6-primarycolor">Gracias por instalar nuestra APP</h3>
<h6>Ésta es su primer versión y trabajamos muy duro para evitar que tengas que hacer largas colas. Puede que todavía nos queden cosas por mejorar!<br><br>Seguimos trabajando y agradecemos tu ayuda para hacer frente al virus.</h6>
`;

export const addressHelperText = `
<h3 style="eon6-primarycolor">Pellegrini 1001, Rosario, Santa Fe</h3>
<h6>Seguimos trabajando muy duro, mientras tanto te pedimos que para esta primer versión ingreses tu dirección incluyendo Ciudad y Provincia.</h6>
`;

export const addressInputHelperText = `
<h3 style="eon6-primarycolor">Pellegrini 1001, Rosario, Santa Fe</h3>
<h6>Seguimos trabajando muy duro, mientras tanto te pedimos que para esta primer versión ingreses tu dirección incluyendo Ciudad y Provincia.</h6>
`;

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
    console.log('getTime() pre', datetime);
    if (typeof datetime === 'string') {
        if (datetime.length === 8) {
            datetime = moment(datetime, "HH:mm:ss").toISOString();
        };
        datetime = new Date(datetime);
    };

    if (datetime instanceof Date) {
        datetime = `${datetime.getHours()}:${datetime.getMinutes()}`
    } else {
        console.log('the getTime() conversion wasnt neither string neither Date type');
    }
    console.log('getTime()', datetime);
    // Agregar un chequeo de isNan() por si el string no tiene el formato Correcto;
    return datetime
}

/**
* Transforma un string HH:mm en un objeto Date
* @param {string} time - HH:mm recibido del backend
*/
export const asDate = (time: string | Date) =>
    new Date(moment(time, "HH:mm").toISOString());

/**
* Formatea un numero en '00' (3 -> 03)
* @param {number} myNumber
*/
export const formatHHmm = (myNumber: number) =>
    numeral(myNumber).format('00');

/**
* Retorna un string DD/MM a partir de un Date
* @param {Date} myDate
*/
export const onlyDate = (myDate: Date | string) =>
    moment(myDate).format('DD/MM')

/**
* Retorna un string YYYY-MM-DD a partir de un Date
* @param {Date} myDate
*/
export const fullDate = (myDate: Date | string) =>
    moment(myDate).format('YYYY-MM-DD')


    /*
    // Esto me servira para filtrar horarios de bookings segun día     cuando haya que hcaerlo 

       whatDayIsIt: string = new Date().toLocaleDateString();
    this.authService.getBookingsByCommerce(commerceId)
    .then(
        resp => {
            console.clear();
            this.commerceBookings = resp.result.filter(
                booking =>
                    // Filtro aquellos que no corresponden al día de hoy
                    this.whatDayIsIt === new Date(moment(booking.created, "YYYY-MM-DDTHH:mm:ss").toISOString()).toLocaleDateString()
            );
            this.manageWorkHours();
        }
    )
    */