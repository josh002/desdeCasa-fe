import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

    /**
     * Inicia proceso para recuperar clave
     * @param email
     */
    resetPassword = (email: string) =>
        this.httpClient.post<DefaultResponse<any>>(`${environment.WS_URL}/reset-password`, { email }, appJsonHeader).toPromise()

    editCommerce = (commerce: Commerce) => {
        let params = new HttpParams();
        params = params.append('id', `${commerce.id}`);
        return this.httpClient.put(`${environment.WS_URL}/commerce`, commerce, appJsonHeader).toPromise()
    }

    getCommerce = (
        options?: {
            considerDeletes?: boolean,
            email?: string,
            shopName?: string,
            latitude?: string,
            longitude?: string,
            maxClients?: string,
            from?: string,
            to?: string,
        }
    ) => {
        let params = new HttpParams();
        if (options && options['considerDeletes']) params = params.append('considerDeletes', `${options['considerDeletes']}`);
        if (options && options['email']) params = params.append('email', `${options['email']}`);
        if (options && options['shopName']) params = params.append('shopName', `${options['shopName']}`);
        if (options && options['latitude']) params = params.append('latitude', `${options['latitude']}`);
        if (options && options['longitude']) params = params.append('longitude', `${options['longitude']}`);
        if (options && options['maxClients']) params = params.append('maxClients', `${options['maxClients']}`);
        if (options && options['from']) params = params.append('from', `${options['from']}`);
        if (options && options['to']) params = params.append('to', `${options['to']}`);
        return this.httpClient.get(`${environment.WS_URL}/commerce`, { params }).toPromise()
    }

    getCommerceById = (id: number) => {
        let params = new HttpParams();
        params = params.append('id', `${id}`);
        return this.httpClient.get(`${environment.WS_URL}/commerce/${id}`, { params }).toPromise()
    }

    deleteCommerce = (id: number) => {
        let params = new HttpParams();
        params = params.append('id', `${id}`);
        return this.httpClient.delete(`${environment.WS_URL}/commerce`, { params }).toPromise()
    }

}
