import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { encryptPass, appJsonHeader } from '../constants/constants';
import { environment } from 'src/environments/environment';
import { DefaultResponse } from '../models/defaultResponse.model';
import { Commerce } from '../models/commerce.model';

@Injectable({
    providedIn: 'root'
})
export class CommerceService {

    constructor(
        private httpClient: HttpClient,
    ) { }

    login = (email: string, password: string, encrypt: boolean = true) => {
        // Si vengo de autologin el password ya está encriptado
        if (encrypt) password = encryptPass(password)
        return this.httpClient.post(`${environment.WS_URL}/commerce/login`, { email, password }).toPromise()
    }

    register = (commerce: any) => {
        commerce.password = encryptPass(commerce.password);
        return this.httpClient.post(`${environment.WS_URL}/commerce`, commerce, appJsonHeader).toPromise()
    } 

    editCommerce = (commerce: Commerce) => {
        return this.httpClient.put(`${environment.WS_URL}/commerce`, commerce, appJsonHeader).toPromise()
    }
   
    /**
     * Inicia proceso para recuperar clave
     * @param email
     */
    resetPassword = (email: string) =>
        this.httpClient.post<DefaultResponse<any>>(`${environment.WS_URL}/reset-password`, { email }, appJsonHeader).toPromise()

}
