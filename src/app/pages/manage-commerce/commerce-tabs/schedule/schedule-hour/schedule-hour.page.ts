import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authService';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Commerce } from 'src/app/models/commerce.model';
import { Booking } from 'src/app/models/booking.model';
import { AlertService } from 'src/app/services/alertService';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { asDate,formatHHmm } from 'src/app/constants/constants';
import { BookingService } from 'src/app/services/booking.service';

@Component({
    selector: 'app-schedule-hour',
    templateUrl: './schedule-hour.page.html',
    styleUrls: ['./schedule-hour.page.scss'],
})
export class ScheduleHourPage implements OnInit {
    bookingsForCommerce: any[];
    commerce: Commerce;

    constructor(
        public alertController: AlertController,
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        private alertService: AlertService,
        private bookingService: BookingService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() { }

    async myAppointment(bookingForCommerce: any) {
        const alert = await this.alertController.create({
            header: `${bookingForCommerce.firstName} ${bookingForCommerce.lastName}`,
            subHeader: `${bookingForCommerce.dni}`,
            message: `Horario: ${asDate(bookingForCommerce.description).getHours()}:${formatHHmm(asDate(bookingForCommerce.description).getMinutes())}`,
            cssClass: 'alert-commerce',
            buttons: ['OK']
        });
        await alert.present();
    }

    ionViewWillEnter() {
        this.commerce = new Commerce(this.localStorageService.getObject('commerce'));

        this.route.paramMap.subscribe(
            (params: Params) => {
                const hour: number = params.params.id;

                this.bookingService.getBookingForCommerce({ commerceId: this.commerce.id })
                    .then((resp: any) => {
                        console.log('commerce', this.commerce);
                        this.bookingsForCommerce = [];
                        // Restaurar este metodo cuando exista el BookingForCommerce model:
                        // resp.result.forEach(elem => this.bookingsForCommerce.push(new Booking(elem)));
                        // Por lo pronto dejar este:
                        this.bookingsForCommerce = resp.result;
                        console.log('bookingsForCommerce', this.bookingsForCommerce)
                        this.bookingsForCommerce = this.bookingsForCommerce.filter(elem => {
                            asDate(elem.description).getHours() == hour
                            console.log(asDate(elem.description).getHours() == hour);
                            return asDate(elem.description).getHours() == hour
                        });
                    })
                    .catch(err => {
                        console.log('err', err);
                        this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                    });

            }
        )

    }

}
