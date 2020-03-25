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
        if (encrypt) password = encryptPass(password)
        return this.httpClient.post(`${environment.WS_URL}/login`, {email, password}).toPromise()
    }

    register = (client: any) => {
        client.password = encryptPass(client.password);
        console.log(client.password);
        return this.httpClient.post(`${environment.WS_URL}/user`, client, appJsonHeader).toPromise()
    }


    editUser = (client: Client) => {
        return this.httpClient.put(`${environment.WS_URL}/user`, client, appJsonHeader).toPromise()
    }

    /**
     * Inicia proceso para recuperar clave
     * @param email
     */
    resetPassword = (email: string) =>
        this.httpClient.post<DefaultResponse<any>>(`${environment.WS_URL}/reset-password`, { email }, appJsonHeader).toPromise()

}