import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import * as crypto from 'crypto-js';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { DefaultResponse } from '../models/defaultResponse.model';

import { map } from 'rxjs/operators';
import { Client } from '../models/client.model';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    constructor(
        private httpClient: HttpClient,
        private fb: Facebook
    ) { }

    // Login por Body
    login = (client: Client, encrypt: boolean = true) => {
        // Si vengo de autologin el password ya está encriptado
        if (encrypt) client.password = encryptPass(client.password)
        return this.httpClient.post(`${environment.WS_URL}/login`, client)
    }

    register = (client: Client) => {
        client.password = encryptPass(client.password);
        console.log(client.password);
        return this.httpClient.post(`${environment.WS_URL}/register`, client, this.appJsonHeader)
    }


    editUser = (user: any) => {
        return this.httpClient.put(
            `${environment.WS_URL}/user`,
            {
                email: user.email,
                user: user.user,
                picture: user.picture
            },
            this.appJsonHeader
        ).toPromise()
    }

    facebookLogin = () => {
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
            .catch(e => console.log('Error logging into Facebook', e));
    }

    uploadImageToAmazon = (myImage: any, userEmail: string) => {
        const formData = new FormData();
        formData.append('myImage', myImage);

        return this.httpClient
            .post<DefaultResponse<any>>(
                `${environment.WS_URL}/user/image?userEmail=${userEmail}`,
                formData
            )
    }


    // getImageFromAmazon = (user: string) => {
    //     return this.httpClient
    //         .get(`${environment.S3_URL}/${user}.jpg`, this.amazonHeader)
    //         .subscribe(res => console.log("No error"), err => console.log("Do error"))
    // }

    /**
     * Inicia proceso para recuperar clave
     * @param email
     */
    resetPassword = (email: string) =>
        this.httpClient
            .post<DefaultResponse<any>>(
                `${environment.WS_URL}/reset-password`,
                { email },
                this.appJsonHeader
            )


    /**
     * Dadas cords latitud y longitud, retorna a un address
     */
    cordsToAddress = (cords: { latitude: number, longitude: number }): Promise<{ formatted_address: string }> => 
        this.httpClient
            .post(
                `${environment.WS_URL}/utils/cord-to-address`, 
                cords, 
                this.appJsonHeader
            ).toPromise().then((resp: any) => resp.result)
    


    /**
     * Utilidades privadas de Auth
     */
    private appJsonHeader = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    }

}


/**
 * Encripta un password en sha256
 * @param {*} password 
 */
const encryptPass = password => crypto.SHA256(password).toString()