import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as crypto from 'crypto-js';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { DefaultResponse } from '../models/defaultResponse.model';

import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import { encryptPass, appJsonHeader } from 'src/app/constants/constants'
import * as moment from 'moment';

@Injectable()
export class AuthService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    // Login por Body
    login = (email: string, password: string, encrypt: boolean = true) => {
        // Si vengo de autologin el password ya está encriptado
        if (encrypt) { password = encryptPass(password); }
        return this.httpClient.post(`${environment.WS_URL}/login`, { email, password }).toPromise()
    }

    loginCommerce = (email: string, password: string, encrypt: boolean = true) => {
        if (encrypt) { password = encryptPass(password); }
        return this.httpClient.post(`${environment.WS_URL}/commerce/login`, { email, password }).toPromise()
    }

    register = (client: any) => {
        client.password = encryptPass(client.password);
        console.log(client.password);
        return this.httpClient.post(`${environment.WS_URL}/user`, client, appJsonHeader).toPromise()
    }


    editUser = (client: Client) => {
        return this.httpClient.put(`${environment.WS_URL}/user/${client.id}`, client, appJsonHeader).toPromise()
    }

    /**
     * Inicia proceso para recuperar clave
     * @param email
     */
    resetPassword = (email: string) =>
        this.httpClient.post<DefaultResponse<any>>(`${environment.WS_URL}/reset-password`, { email }, appJsonHeader).toPromise()


    /**
    * Inicia proceso para cambiar clave
    * @param id {number} id del usuario
    * @param password {string} contraseña actual
    * @param newPassword {string}  nueva contraseña
    **/
    changePassword = (id: number, password: string, newPassword: string) => {
        password = encryptPass(password);
        newPassword = encryptPass(newPassword);
        return this.httpClient.post<DefaultResponse<any>>(`${environment.WS_URL}/change-password/${id}`, { password, newPassword }, appJsonHeader).toPromise()
    }


    /**
     * Dado un usuario retorna comercios cercanos
     */
    getCommercesByUser = (userId: number): Promise<any> =>
        this.httpClient.get(`${environment.WS_URL}/commerce/user/${userId}`).toPromise()

    /**
     * Dado un comercio retorna sus reservas
     */
    getBookingsByCommerce = (commerceId: number): Promise<any> =>
        this.httpClient.get(`${environment.WS_URL}/booking?commerceId=${commerceId}`).toPromise()
}