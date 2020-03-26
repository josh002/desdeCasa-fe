import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Commerce } from 'src/app/models/commerce.model';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.page.html',
    styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage implements OnInit {

    bookings: any[]

    constructor(
        private authService: AuthService,
        private localStorageService: LocalStorageService
    ) { }

    ngOnInit() {

        const currentCommerce: Commerce = this.localStorageService.getObject('commerce');

        this.authService.getBookingsByCommerce(currentCommerce.id)
            .then(
                resp => {
                    debugger;
                }
            )

    }


}
