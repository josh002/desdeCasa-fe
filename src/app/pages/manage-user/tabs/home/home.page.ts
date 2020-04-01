import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { AuthService } from 'src/app/services/authService';
import { Commerce } from 'src/app/models/commerce.model';
import { Client } from 'src/app/models/client.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { Platform } from "@ionic/angular";

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    client: Client;
    commerces: Commerce[];
    private backButtonSubscription;
    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        public platform: Platform
    ) { }

    ngOnInit() { }
    
    ionViewDidEnter() {
        this.backButtonSubscription = this.platform.backButton.subscribe(() => {
            navigator['app'].exitApp();
        });
    }

    ionViewWillLeave() {
        this.backButtonSubscription.unsubscribe();
    }

    ionViewWillEnter() {
        this.client = this.localStorageService.getObject('client') === null ?
            undefined :
            new Client(this.localStorageService.getObject('client'));
        if (this.client === undefined) {
            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
            this.router.navigate(['/start']);
        }
        this.authService.getCommercesByUser(this.client.id)
            .then((resp: any) => {
                console.log('resp', resp);
                this.commerces = [];
                resp.result.forEach((element: any) => this.commerces.push(new Commerce(element)))
            })
            .catch(err => {
                
                console.log('err', err);
                if (err && err.error && err.error.status === -1) {
                    this.alertService.simpleAlert(err.error.message);
                } else {
                    this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                }
                this.router.navigate(['/start']);
            });
    }
    goLogout(){
        // this.router.navigate(['/tabs/home/logout'])
        alert('hola')
    }   
    
}
