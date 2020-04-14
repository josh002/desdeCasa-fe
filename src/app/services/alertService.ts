import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Injectable()
export class AlertService {

    constructor(
        public alertController: AlertController,
        private router: Router,
    ) { }

    simpleAlert = (message) => {
        this.alertController.create({
            message, buttons: ['OK'],
            cssClass: 'alert-user',
        })
            .then(alert => {
                alert.present();
            });
        ;
    }

    headerAlert = (header, message) => {
        this.alertController.create({
            header, message, buttons: ['OK'],
            cssClass: 'alert-user',
        })
            .then(alert => {
                alert.present();
            });
        ;
    }

    marketMapAlert = (header, subHeader, message,commerceId) => {
        this.alertController.create({
            header, subHeader, message, buttons: [
                {
                    text: 'Pedir Turno',
                    cssClass: 'getAppointment',
                    handler: ()=> {
                        this.router.navigate(['/tabs/maps/get-appointment/',commerceId]);
                    }
                },
                {
                    text: 'Ok',
                },
                
            ],
            cssClass: 'marketMapAlert',
        }).then(alert => {
            alert.present();
        });
    }
    // simpleAlert = (header, subHeader, message) =>
    //     this.alertController.create({
    //         header, subHeader, message, buttons: ['OK']
    //     });

}
