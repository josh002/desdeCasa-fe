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
import { Commerce } from 'src/app/models/commerce.model';
import { CommerceService } from 'src/app/services/commerce.service';

@Component({
    selector: 'app-start',
    templateUrl: './start.page.html',
    styleUrls: ['./start.page.scss'],
})

export class StartPage implements OnInit {
    email: string;
    password: string;
    togglePass: boolean = false;
    togglePassIcon: string;
    iconOn: string = "eye";
    iconOff: string = "eye-off";

    private backButtonSubscription;
    constructor(
        private router: Router,
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private loadingService: LoadingService,
        private alertService: AlertService,
        private accountService: AccountService,
        private commerceService: CommerceService,
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
        this.togglePass = false;
        this.togglePassIcon = this.iconOn;
    }

    ionViewWillEnter() {
        this.password = undefined;
        const autoClient: Client = this.localStorageService.getObject('client') === null ? undefined : new Client(this.localStorageService.getObject('client'));
        console.log(autoClient);
        if (autoClient && autoClient.email != '' && autoClient.password != '') {
            this.authService.login(autoClient.email, autoClient.password, false)
                .then(
                    (resp: any) => { if (resp && resp.status == 0) { this.router.navigate(['/tabs/home']); } }
                )
                .catch(
                    err => { console.log(err) }
                );
        }
        const autoCommerce: Commerce = this.localStorageService.getObject('commerce') === null ? undefined : new Commerce(this.localStorageService.getObject('commerce'));
        console.log(autoCommerce);
        if (autoCommerce && autoCommerce.email != '' && autoCommerce.password != '') {
            this.commerceService.login(autoCommerce.email, autoCommerce.password, false)
                .then(
                    (resp: any) => { if (resp && resp.status == 0) { this.router.navigate(['/manage-commerce/commerce-tabs/schedule']); } }
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
                                    const client = new Client(resp.result.queryResolve[0]);
                                    this.localStorageService.setObject('client', client);
                                    // this.accountService.update(client);
                                    this.router.navigate(['/tabs/home']);
                                }
                            }
                        )
                        .catch(err => {

                            this.authService.loginCommerce(this.email, this.password)
                                .then(
                                    (resp: any) => {
                                        this.loadingService.dismissLoading();
                                        if (resp && resp.status == 0) {
                                            console.log(resp);
                                            const commerce = new Commerce(resp.result.queryResolve[0]);
                                            this.localStorageService.setObject('commerce', commerce);

                                            this.router.navigate(['/manage-commerce/commerce-tabs/schedule']);
                                        }
                                    }
                                )
                                .catch(
                                    err => {
                                        this.password = '';
                                        this.loadingService.dismissLoading();
                                        if (err && err.error && err.error.status === -1) {
                                            this.alertService.simpleAlert(err.error.message);
                                        } else {
                                            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                                        }
                                        console.log('err', err);
                                    }
                                )

                        })
                }
            );

    }


    togglePassword() {
        this.togglePass = !this.togglePass;
        if (this.togglePass) {
            this.togglePassIcon = this.iconOff;
        }
    }
} 
