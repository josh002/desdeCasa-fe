import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.page.html',
    styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {

    constructor(
        public alertController: AlertController,
    ) { }

    ngOnInit() {
    }
    async myAppointment() {
        const alert = await this.alertController.create({
            header: 'Turno en supermercado',
            subHeader: 'Don Pepe',
            message: 'Horario : 8:15',
            cssClass: 'alert-query',
            buttons: [
                {
                    text: 'Cancelar Turno',
                    cssClass:'cancel-button'
                },
                {
                    text: 'Ok',
                }]
        });
        await alert.present();
    }

}
