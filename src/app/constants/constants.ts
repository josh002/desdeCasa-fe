import * as crypto from 'crypto-js';

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
