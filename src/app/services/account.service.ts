import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Account } from '../models/account.model';
import { LocalStorageService } from './localStorageService';
import { LoginService } from './loginService';

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    account: Account = new Account();
    subject = new Subject<Account>();

    constructor(
        private localStorageService: LocalStorageService,
        private loginService: LoginService,
    ) {
        this.account.username = this.localStorageService.getObject('username');
        this.account.password = this.localStorageService.getObject('password');
        this.loginService.autoLogin(this.account)
            .then((resp: any) => { if (resp && resp.status == 0) { this.account = resp.result.queryResolve[0]; } })
            .catch(err => { console.log(err) });
    };

    get = (): Account => this.account;

    doSubscribe(): Observable<any> {
        return this.subject.asObservable();
    }

    update(account: Account) {
        this.account = account;
        this.subject.next(this.account);
    }

    clear() {
        this.account = undefined;
        this.update(undefined);
    }

}