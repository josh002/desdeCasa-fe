import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Commerce } from 'src/app/models/commerce.model';
import { Booking } from 'src/app/models/booking.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.page.html',
    styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {
    bookings: any[];
    commerce: Commerce;

    constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService,
        private alertService: AlertService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.commerce = new Commerce(this.localStorageService.getObject('commerce'));
        this.authService.getBookingsByCommerce(this.commerce.id)
            .then((resp: any) => {
                console.log('commerce', this.commerce);
                this.bookings = [];
                resp.result.forEach(elem => this.bookings.push(new Booking(elem)));
                console.log('bookings', this.bookings)
            })
            .catch(err => {
                console.log(err);
                this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
            });

    }


}
