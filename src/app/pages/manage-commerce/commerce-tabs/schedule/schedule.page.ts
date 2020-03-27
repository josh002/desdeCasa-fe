import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Commerce } from 'src/app/models/commerce.model';
import { Booking } from 'src/app/models/booking.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { asDate } from 'src/app/constants/constants';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.page.html',
    styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
    // bookings: any[];
    commerce: Commerce;

    startHour1: number;
    endHour1: number;
    startHour2: number;
    endHour2: number;

    // Arreglo con horas
    hours: number[];

    constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        private alertService: AlertService,
        private router: Router,
    ) { }

    ngOnInit() { };

    ionViewWillEnter() {
        this.hours = [];
        for (var i = 0; i < 24; i++) this.hours.push(i);
        this.commerce = new Commerce(this.localStorageService.getObject('commerce'));

        this.startHour1 = asDate(this.commerce.openTime1).getHours();
        this.endHour1 = asDate(this.commerce.closeTime1).getHours();
        this.startHour2 = this.commerce.openTime2 === null ? undefined : asDate(this.commerce.openTime2).getHours();
        this.endHour2 = this.commerce.closeTime2 === null ? undefined : asDate(this.commerce.closeTime2).getHours();
        if (asDate(this.commerce.closeTime1).getMinutes() > 0) this.endHour1++;
        if (asDate(this.commerce.closeTime2).getMinutes() > 0) this.endHour2++;

        // this.route.paramMap.subscribe(
        //     (params: Params) => {
        //         const hour: number = params.params.id;

        //         this.authService.getBookingsByCommerce(this.commerce.id)
        //             .then((resp: any) => {
        //                 console.log('commerce', this.commerce);
        //                 this.bookings = [];
        //                 resp.result.forEach(elem => this.bookings.push(new Booking(elem)));
        //                 // this.bookings = this.bookings.filter(elem => elem.description == hour);
        //                 console.log('bookings', this.bookings)
        //             })
        //             .catch(err => {
        //                 console.log('err', err);
        //                 this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
        //             });

        //     }
        // )


    }
}
