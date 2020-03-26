import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Injectable()
export class AlertService {

    constructor(
        public alertController: AlertController
    ) { }

    simpleAlert = (message) => {
        this.alertController.create({
            message, buttons: ['OK'],
            cssClass:'alert-user',
        })
            .then(alert => {
                alert.present();
            });
        ;
    }

    headerAlert = (header, message) => {
        this.alertController.create({
            header, message, buttons: ['OK'],
            cssClass:'alert-user',
        })
            .then(alert => {
                alert.present();
            });
        ;
    }

    // simpleAlert = (header, subHeader, message) =>
    //     this.alertController.create({
    //         header, subHeader, message, buttons: ['OK']
    //     });

}
