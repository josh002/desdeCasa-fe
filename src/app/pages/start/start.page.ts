import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { AuthService } from 'src/app/services/authService';
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
    email: string;
    password: string;

    private backButtonSubscription;
    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
        private authService: AuthService,
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
        this.password = undefined;
        const autoAccount: Client = this.localStorageService.getObject('user') === null ? undefined : new Client(this.localStorageService.getObject('user'));
        if (autoAccount && autoAccount.email != '' && autoAccount.password != '') {
            this.authService.login(this.email, this.password, false)
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
                    this.email = this.email.trim();
                    this.password = this.password.trim();
                    this.authService.login(this.email, this.password)
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status == 0) {
                                    console.log(resp);
                                    new Client(resp.result.queryResolve[0]);
                                    // add userid a localstorage
                                    this.accountService.update(resp.result.queryResolve[0]);
                                    this.router.navigate(['/tabs/home']);
                                }
                            }
                        )
                        .catch(err => {
                            this.password = '';
                            this.loadingService.dismissLoading();
                            if (err.error.status === -1) {
                                this.alertService.simpleAlert(err.error.message);
                            } else {
                                this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                            }
                            console.log(err);
                        })
                }
            );

    }
}
