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
    startMinute1: number;
    endMinute1: number;
    startMinute2: number;
    endMinute2: number;
    currentHour: number;

    // Arreglo con horas
    hours: OccupiedShifts[];

    days: Array<any> = [];
    selectedDay: number = 0; //indice del arreglo que tiene los dias
    commerceId: number;



    constructor(
        private commerceService: CommerceService,
        private bookingService: BookingService,
        private alertService: AlertService,
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        moment.locale('es');
        for (let index = 0; index < 7; index++) {
            this.days[index] = moment().clone().add(index, 'day').format("D MMMM");
        }
    }

    ionViewWillEnter() {
        this.currentHour = new Date().getHours();
        //obtener el id de la url
        this.commerceId = this.getUrlParam();
        //configurar los horarios del comercio
        this.commerceService.getCommerceById(this.commerceId)
            .then((resp: any) => {
                if (resp.result.length < 1) {
                    this.router.navigate(['/tabs/home']);
                    this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                }
                console.log(resp.result[0]);
                this.commerce = new Commerce(resp.result[0]);
                if (this.commerce.shoppingMinutes < 1) this.commerce.shoppingMinutes = 1;
                console.log(this.commerce);

                //aca se configuran las horas del comercio
                this.configCommerHours();

                //obtine el arreglo de horas
                this.getHoursArray(0);

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

    changeDay(amount: boolean) {
        //que no se pase del array      
        if ((amount) && (this.selectedDay < this.days.length - 1)) {
            this.selectedDay++;
        } else if ((!amount) && (this.selectedDay != 0)) {
            this.selectedDay--;
        }
    }

    getUrlParam() {
        let id: number;
        this.route.paramMap.subscribe((params: Params) => {
            id = params.params.id;
            localStorage.setItem('commerceId', `${id}`);
        })
        return id;
    }

    configCommerHours() {
        this.startHour1 = asDate(this.commerce.openTime1).getHours();
        this.endHour1 = asDate(this.commerce.closeTime1).getHours();
        this.startHour2 = this.commerce.openTime2 === null ? undefined : asDate(this.commerce.openTime2).getHours();
        this.endHour2 = this.commerce.closeTime2 === null ? undefined : asDate(this.commerce.closeTime2).getHours();
        if (asDate(this.commerce.closeTime1).getMinutes() > 0) this.endHour1++;
        if (asDate(this.commerce.closeTime2).getMinutes() > 0) this.endHour2++;

        this.startMinute1 = asDate(this.commerce.openTime1).getMinutes();
        this.endMinute1 = asDate(this.commerce.closeTime1).getMinutes();
        this.startMinute2 = this.commerce.openTime2 === null ? undefined : asDate(this.commerce.openTime2).getMinutes();
        this.endMinute2 = this.commerce.closeTime2 === null ? undefined : asDate(this.commerce.closeTime2).getMinutes();
    }

    //tiene que resicibir el parmetro que le indica de que dia es?
    getHoursArray(day: any) {

        this.bookingService.getBookingDayShifts(this.commerceId, fullDate(new Date()))
            .then((resp: any) => {
                console.log("resp.result", resp.result)
                this.hours = resp.result
                console.log('hours', this.hours);
                // this.hours = [];
                // resp.result.forEach(element => {
                //     /*
                //      * Versión vieja, más robusta
                //      * Manejamos desde el html como se muestra
                //      */
                //     this.hours.push(element);
                // });
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



