import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { NavController, LoadingController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loadingService';
import { UtilsService } from 'src/app/services/utils.service';
import { encryptPass } from 'src/app/constants/constants'
import { GeolocationService } from 'src/app/services/geolocationService';
import { ClientRegister } from 'src/app/models/client-register.interface';

@Component({
    selector: 'app-client',
    templateUrl: './client.page.html',
    styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
    client: ClientRegister = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dni: undefined,
        address: '',
    };
    desperationLevel: number;

    constructor(
        private alertService: AlertService,
        private utilsService: UtilsService,
        private router: Router,
        public navCtrl: NavController,
        public loadingService: LoadingService,
        public popoverController: PopoverController,
        public geolocationService: GeolocationService,
        public authService: AuthService,
    ) { }

    ngOnInit() {
        this.desperationLevel = 0;

        // Setea localización actual del usuario en address
        this.geolocationService.getCurrentLocation()
            .then(
                latLong => { return this.authService.cordsToAddress(latLong) }
            )
            .then(
                ({ formatted_address }) => this.client.address = formatted_address
            )
    }

    desperateUser() {
        this.desperationLevel = ++this.desperationLevel;
        console.log(`Im this desperate: ${this.desperationLevel}`);
    }

    onSubmit() {
        // Formatear con el método de la clase correspondiente
        // this.formatData();
        this.client.password = encryptPass(this.client.password);

        this.loadingService.presentLoading("Cargando")
            .then(
                (resp: any) => {
                    this.authService.register(this.client)
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status === 0) {
                                    const { message } = resp;
                                    this.alertService.headerAlert('Exito', message)
                                    this.router.navigate(['/start'])
                                } else {
                                    if (resp.error) {
                                        this.alertService.simpleAlert(resp.error.message)
                                    }
                                }
                            }
                        )
                        .catch(err => {
                            this.loadingService.dismissLoading();
                            console.log(err);
                            if (err.error.status === -1) {
                                this.alertService.simpleAlert(err.error.message);
                            }else{
                                this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                            }

                        })
                }
            )
    }
}




