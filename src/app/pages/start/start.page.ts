import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Account } from 'src/app/models/account.model';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { LoginService } from 'src/app/services/loginService';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loadingService';
import { AlertService } from 'src/app/services/alertService';
import { AccountService } from 'src/app/services/account.service';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';

@Component({
    selector: 'app-start',
    templateUrl: './start.page.html',
    styleUrls: ['./start.page.scss'],
})

export class StartPage implements OnInit {
    account = new Account();
    private backButtonSubscription;
    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
        private loginService: LoginService,
        private loadingService: LoadingService,
        private alertService: AlertService,
        private accountService: AccountService,
        private platform: Platform,
        private splashScreen: SplashScreen,
    ) { }

    ngOnInit() { }

    ionViewDidEnter() {
        this.backButtonSubscription = this.platform.backButton.subscribe(() => {
            navigator['app'].exitApp();
        });
        this.splashScreen.hide();
    }

    ionViewWillLeave() {
        this.backButtonSubscription.unsubscribe();
    }
    
    ionViewWillEnter() {
        this.account.password = undefined;
        const autoAccount: Account = this.localStorageService.getObject('user');
        if (autoAccount != null && autoAccount.username != '' && autoAccount.password != '') {
            this.loginService.autoLogin(this.account)
                .then(
                    (resp: any) => { if (resp && resp.status == 0) { this.router.navigate(['/tabs/forum']); } }
                )
                .catch(
                    err => { console.log(err) }
                );
        }
    }

    doLogin() {
        this.loadingService.presentLoading("Cargando")
            .then(
                (resp: any) => {
                    this.account.username = this.account.username.trim();
                    this.account.password = this.account.password.trim();
                    this.loginService.login(this.account)
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status == 0) {
                                    console.log(resp);
                                    this.account = resp.result.queryResolve[0];
                                    this.localStorageService.setObject('token', resp.result.token);
                                    this.localStorageService.setObject('username', this.account.username);
                                    this.localStorageService.setObject('password', this.account.password);
                                    this.accountService.update(resp.result.queryResolve[0]);
                                    this.router.navigate(['/tabs/forum']);
                                } else {
                                    if (resp.error) {
                                        console.log('error response:');
                                        this.alertService.simpleAlert(resp.error.message);
                                    }
                                }
                            }
                        )
                        .catch(err => {
                            this.account.password = '';
                            this.loadingService.dismissLoading();
                            this.alertService.simpleAlert(err.error.message)
                            console.log(err);
                        })
                }
            );

    }
}
