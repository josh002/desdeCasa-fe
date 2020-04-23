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

    days: Array<any>=[];
    selectedDay: number = 0; //indice del arreglo que tiene los dias
   

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


    changeDay(amount: boolean) {
        //que no se pase del array      
        if ((amount) && (this.selectedDay < this.days.length - 1)) {
            this.selectedDay++;
        } else if ((!amount) && (this.selectedDay != 0)) {
            this.selectedDay--;
        }
    }




    ionViewWillEnter() {
        this.currentHour = new Date().getHours();
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
                        console.log(resp.result[0]);
                        this.commerce = new Commerce(resp.result[0]);
                        if (this.commerce.shoppingMinutes < 1) this.commerce.shoppingMinutes = 1;
                        console.log(this.commerce);

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
                            /*
                             * Versión vieja, más robusta
                             * Manejamos desde el html como se muestra
                             */
                            this.hours.push(element);

                            // var currentMinute = new Date().getMinutes();

                            // var criticalTime: boolean = 10*this.commerce.shoppingMinutes + currentMinute > closingMinutes

                            // Si estamos en este caso 
                            // if (element.hour > currentHour) this.hours.push(element);

                            // // Si se cumple esta condicion la endHour1/2 están aumentadas en +1
                            // const compensateExtraHour = (asDate(this.commerce.closeTime1).getMinutes() > 0) ? 1 : 0;

                            // // El local tiene un horario de cierre que no es en punto
                            // if (asDate(this.commerce.closeTime1).getMinutes() > 0) {
                            //     // endHour está incrementada en 1
                            //     if (currentHour == this.endHour1 - 1) {
                            //         if (element.hour == currentHour && (this.endMinute1 - this.commerce.shoppingMinutes * 10 > currentMinute))
                            //             this.hours.push(element);
                            //     } else {
                            //         if (element.hour == currentHour && (60 - this.commerce.shoppingMinutes * 10 > currentMinute))
                            //             this.hours.push(element);
                            //     }

                            // } else {
                            //             this.hours.push(element);
                            //     }
                            // }

                            // Considerar para el posible segundo turno
                            // if (this.commerce.closeTime2 && asDate(this.commerce.closeTime2).getMinutes() > 0) {

                            // }
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
