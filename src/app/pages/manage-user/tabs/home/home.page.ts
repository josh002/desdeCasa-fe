import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { AuthService } from 'src/app/services/authService';
import { Commerce } from 'src/app/models/commerce.model';
import { Client } from 'src/app/models/client.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    client: Client;
    commerces: Commerce[];

    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private alertService: AlertService,
        private router: Router,
    ) { }

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
                this.commerces = [];
                resp.result.forEach(
                    (element: any) => this.commerces.push(new Commerce(element))
                )
            })
            .catch(err => {
                console.log(err);
                if (err.error.status === -1) {
                    this.alertService.simpleAlert(err.error.message);
                } else {
                    this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                }
                this.router.navigate(['/start']);
            });
    }


}
