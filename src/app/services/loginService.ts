import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { LocalStorageService } from './localStorageService';
import { Client } from '../models/client.model';

@Injectable()
export class LoginService {

    constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService
    ) { }

    login = (client: Client) =>
        this.authService.login(client).toPromise()

    autoLogin = (client: Client) =>
        this.authService.login(client, false).toPromise()

    register = (client: Client) =>
        this.authService.register(client).toPromise()

    resetPassword = (email: string) =>
        this.authService.resetPassword(email).toPromise()

    facebookLogin = (client: Client) =>
        this.authService.facebookLogin()
}
