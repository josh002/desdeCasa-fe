import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Commerce } from 'src/app/models/commerce.model';
import { Booking } from 'src/app/models/booking.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { asDate, fullDate } from 'src/app/constants/constants';
import { BookingService } from 'src/app/services/booking.service';

interface OccupiedShifts {
    hour: number,
    taken: number
}

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.page.html',
    styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
    commerce: Commerce;

    startHour1: number;
    endHour1: number;
    startHour2: number;
    endHour2: number;

    // Arreglo con horas
    hours: OccupiedShifts[];

    constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        private bookingService: BookingService,
        private alertService: AlertService,
        private router: Router,
    ) { }

    ngOnInit() { };

    ionViewWillEnter() {
        this.commerce = new Commerce(this.localStorageService.getObject('commerce'));

        this.startHour1 = asDate(this.commerce.openTime1).getHours();
        this.endHour1 = asDate(this.commerce.closeTime1).getHours();
        this.startHour2 = this.commerce.openTime2 === null ? undefined : asDate(this.commerce.openTime2).getHours();
        this.endHour2 = this.commerce.closeTime2 === null ? undefined : asDate(this.commerce.closeTime2).getHours();
        if (asDate(this.commerce.closeTime1).getMinutes() > 0) this.endHour1++;
        if (asDate(this.commerce.closeTime2).getMinutes() > 0) this.endHour2++;

        this.bookingService.getBookingDayShifts(this.commerce.id, fullDate(new Date()))
            .then((resp: any) => {
                this.hours = [];
                resp.result.forEach(element => {
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
}
