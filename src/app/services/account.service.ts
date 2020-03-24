import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Client } from '../models/client.model';
import { LocalStorageService } from './localStorageService';
import { LoginService } from './loginService';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    client: Client = new Client();
    subject = new Subject<Client>();

    constructor(
        private localStorageService: LocalStorageService,
        private loginService: LoginService,
    ) {
        this.client.email = this.localStorageService.getObject('email');
        this.client.password = this.localStorageService.getObject('password');
        this.loginService.autoLogin(this.client)
            .then((resp: any) => { if (resp && resp.status == 0) { this.client = resp.result.queryResolve[0]; } })
            .catch(err => { console.log(err) });
    };

    get = (): Client => this.client;

    doSubscribe(): Observable<any> {
        return this.subject.asObservable();
    }

    update(client: Client) {
        this.client = client;
        this.subject.next(this.client);
    }

    clear() {
        this.client = undefined;
        this.update(undefined);
    }

}