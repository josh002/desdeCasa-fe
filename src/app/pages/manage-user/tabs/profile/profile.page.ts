import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { ClientRegister } from 'src/app/models/client-register.interface';
import { LoadingService } from 'src/app/services/loadingService';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { LocalStorageService } from 'src/app/services/localStorageService';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

    client: Client = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dni: undefined,
        address: '',
        latitude: null,
        longitude: null
    };

    desperationLevel: number;

    disabled: boolean = true;

    constructor(
        private authService: AuthService,
        private loadingService: LoadingService,
        private alertService: AlertService,
        private router: Router,
        private localStorageService: LocalStorageService
    ) { }


    desperateUser() {
        this.desperationLevel = ++this.desperationLevel;
        console.log(`Im this desperate: ${this.desperationLevel}`);
    }

    ngOnInit() {

        this.client = this.localStorageService.getObject('client');

    }


    onSubmit() {
        this.desperationLevel = 0;


        this.loadingService.presentLoading("Cargando")
            .then(
                (resp: any) => {
                    this.authService.editUser(this.client)
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status === 0) {
                                    const { message } = resp;
                                    this.localStorageService.setObject('client', this.client);
                                    this.disabled = true;
                                    this.alertService.headerAlert('Exito', message)
                                    this.router.navigate(['/tabs/home'])
                                } else {
                                    if (resp.error) {
                                        this.alertService.simpleAlert(resp.error.message)
                                    }
                                }
                            }
                        )
                        .catch(err => {
                            this.changeDisabled();
                            this.loadingService.dismissLoading();
                            console.log(err);
                            if (err.error.status === -1) {
                                this.alertService.simpleAlert(err.error.message);
                            } else {
                                this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                            }
                        })
                }
            )
    }

    changeDisabled() {
        this.disabled = !this.disabled;
        this.client = this.localStorageService.getObject('client');
    }

}
