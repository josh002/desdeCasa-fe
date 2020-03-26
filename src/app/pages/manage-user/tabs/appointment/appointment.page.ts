import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Client } from 'src/app/models/client.model';
import { Commerce } from 'src/app/models/commerce.model';
import { BookingService } from 'src/app/services/booking.service';
import { AlertService } from 'src/app/services/alertService';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Router } from '@angular/router';
import { Booking } from 'src/app/models/booking.model';
import { onlyDate } from 'src/app/constants/constants';

@Component({
    selector: 'app-appointment',
    templateUrl: './appointment.page.html',
    styleUrls: ['./appointment.page.scss'],
})
export class AppointmentPage implements OnInit {
    client: Client;
    bookings: Booking[];
    cancelBookingId: number;

    constructor(
        public alertController: AlertController,
        private bookingService: BookingService,
        private alertService: AlertService,
        private localStorageService: LocalStorageService,
        private router: Router,
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.bookings = [];
        this.client = new Client(this.localStorageService.getObject('client'));
        console.log(this.client);
        this.bookingService.getBooking({ userId: this.client.id })
            .then((resp: any) => {
                resp.result.forEach(element => {
                    this.bookings.push(new Booking(element));
                });;
                console.log(this.bookings);

            })
            .catch(err => {
                console.log(err);
                this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                this.router.navigate(['/tabs/home']);
            });
    }

    doCancel() {
        console.log('cancelar turno');
        this.bookingService.deleteBooking(this.cancelBookingId)
            .then((resp: any) => {
                console.log(resp);
                if (resp.result == 1) {
                    this.bookings = this.bookings.filter(
                        elem => elem.id != this.cancelBookingId
                    )
                } else {
                    this.alertService.simpleAlert("Algo salió mal! Intente nuevamente más tarde.");
                }
            })
            .catch((err: any) => {
                console.log(err);
            });
    }

    async myAppointment(booking: Booking) {
        this.cancelBookingId = booking.id;
        const alert = await this.alertController.create({
            header: booking.shopName,
            subHeader: booking.address,
            message: `${onlyDate(booking.created)} - ${booking.description.slice(0, 5)}`,
            cssClass: `alert-query`,
            buttons: [
                { text: `Cancelar Turno`, role: 'cancel', handler: () => this.youSure() },
                { text: `Cerrar` }
            ]
        });

        await alert.present();
    }

    async youSure() {
        const alert = await this.alertController.create({
            header: `¿Desea cancelar este turno?`,
            // subHeader: booking.address,
            // message: `${onlyDate(booking.created)} - ${booking.description.slice(0,5)}`,
            cssClass: `alert-user`,
            buttons: [
                { text: `No`, role: 'cancel', },
                { text: `Cancelar`, handler: () => this.doCancel() }
            ]
        });

        await alert.present();
    }

}
