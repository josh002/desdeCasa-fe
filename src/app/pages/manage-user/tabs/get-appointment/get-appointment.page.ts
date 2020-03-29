import { Component, OnInit } from '@angular/core';
import { CommerceService } from 'src/app/services/commerce.service';
import { Commerce } from 'src/app/models/commerce.model';
import { AlertService } from 'src/app/services/alertService';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { getTime, asDate, fullDate } from 'src/app/constants/constants';
import * as moment from 'moment';
import { faCommentsDollar } from '@fortawesome/free-solid-svg-icons';
import { BookingService } from 'src/app/services/booking.service';

interface OccupiedShifts {
    hour: number,
    taken: number
}

@Component({
    selector: 'app-get-appointment',
    templateUrl: './get-appointment.page.html',
    styleUrls: ['./get-appointment.page.scss'],
})
export class GetAppointmentPage implements OnInit {
    commerce: Commerce;
    id: number;
    startHour1: number;
    endHour1: number;
    startHour2: number;
    endHour2: number;


    // Arreglo con horas
    hours: OccupiedShifts[];


    constructor(
        private commerceService: CommerceService,
        private bookingService: BookingService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.route.paramMap.subscribe(
            (params: Params) => {
                const commerceId: number = params.params.id;
                localStorage.setItem('commerceId', `${commerceId}`);

                this.commerceService.getCommerceById(commerceId)
                    .then((resp: any) => {
                        if (resp.result.length < 1) {
                            this.router.navigate(['/tabs/home']);
                            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                        }
                        this.commerce = new Commerce(resp.result[0]);
                        console.log(this.commerce);

                        this.startHour1 = asDate(this.commerce.openTime1).getHours();
                        this.endHour1 = asDate(this.commerce.closeTime1).getHours();
                        this.startHour2 = this.commerce.openTime2 === null ? undefined : asDate(this.commerce.openTime2).getHours();
                        this.endHour2 = this.commerce.closeTime2 === null ? undefined : asDate(this.commerce.closeTime2).getHours();
                        if (asDate(this.commerce.closeTime1).getMinutes() > 0) this.endHour1++;
                        if (asDate(this.commerce.closeTime2).getMinutes() > 0) this.endHour2++;

                    })
                    .catch(err => {
                        console.log('err', err);
                        if (err && err.error && err.error.status === -1) {
                            this.alertService.simpleAlert(err.error.message);
                        } else {
                            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                        }
                        this.router.navigate(['/tabs/home']);
                    });

                this.bookingService.getBookingDayShifts(commerceId, fullDate(new Date()))
                    .then((resp: any) => {
                        // TODO: el bucle es al p2, podes hacer:
                        // this.hours = resp.result
                        this.hours = [];
                        resp.result.forEach(element => {
                            var currentHour = new Date().getHours();
                            var currentMinute = new Date().getMinutes();
                           
                            if (element.hour > currentHour)
                                this.hours.push(element);
                            if (element.hour == currentHour && (60 - this.commerce.shoppingMinutes * 10 > currentMinute))
                                this.hours.push(element);
                        });
                        console.log('hours', this.hours);

                    })
                    .catch(err => {
                        console.log('err', err);
                        if (err && err.error && err.error.status === -1) {
                            this.alertService.simpleAlert(err.error.message);
                        } else {
                            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                        }
                        this.router.navigate(['/tabs/home']);
                    });

            }
        )
    }

}
