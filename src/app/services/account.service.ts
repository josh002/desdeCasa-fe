import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Client } from '../models/client.model';
import { LocalStorageService } from './localStorageService';
import { AuthService } from './authService';
import { EmailValidator } from '@angular/forms';
import { stringify } from 'querystring';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    email: string;
    password: string;
    client: Client;
    subject = new Subject<Client>();

    constructor(
        // private localStorageService: LocalStorageService,
        // private authService: AuthService,
    ) {
        // this.email = this.localStorageService.getObject('email');
        // this.password = this.localStorageService.getObject('password');
        // this.authService.login(this.email, this.password, false)
        //     .then((resp: any) => { if (resp && resp.status == 0) { this.client = new Client(resp.result.queryResolve[0]) ; } })
        //     .catch(err => { console.log(err) });
    };

    get = (): Client => this.client;

    doSubscribe(): Observable<any> {
        return this.subject.asObservable();
    }

    update(client: Client) {
        this.client = new Client(client);
        this.subject.next(this.client);
    }

    clear() {
        this.client = undefined;
        this.update(undefined);
    }

}