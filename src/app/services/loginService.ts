import { Injectable } from '@angular/core';
import { AuthService } from './authService';
import { LocalStorageService } from './localStorageService';
import { Account } from '../models/account.model';

@Injectable()
export class LoginService {

    constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService
    ) { }

    login = (account: Account) =>
        this.authService.login(account).toPromise()

    autoLogin = (account: Account) =>
        this.authService.login(account, false).toPromise()

    register = (account: Account) =>
        this.authService.register(account).toPromise()

    resetPassword = (email: string) =>
        this.authService.resetPassword(email).toPromise()

    facebookLogin = (account: Account) =>
        this.authService.facebookLogin()
}
