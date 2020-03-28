import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { CommerceService } from 'src/app/services/commerce.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Commerce } from 'src/app/models/commerce.model';
import { Timetable } from 'src/app/models/timetable.model';
import { BookingService } from 'src/app/services/booking.service';
import { TimetableService } from 'src/app/services/timetable.service';
import { formatHHmm, asDate } from 'src/app/constants/constants';
import { BookingRegister, Booking } from 'src/app/models/booking.model';
import { Client } from 'src/app/models/client.model';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { AuthService } from 'src/app/services/authService';
import * as moment from 'moment';

@Component({
    selector: 'app-appointment-hour',
    templateUrl: './appointment-hour.page.html',
    styleUrls: ['./appointment-hour.page.scss'],
})
export class AppointmentHourPage implements OnInit {
    client: Client;
    commerce: Commerce;
    hour: number;
    timetable: Timetable[];
    selectedTimetable: Timetable;
    selectedMinutes: number;
    // shifts: number[]; // Arreglo con turnos
    shifts: any[]; // Arreglo con turnos

    // Esta linea luego podrá usarse cuando el día sea variable
    whatDayIsIt: string = new Date().toLocaleDateString();

    startMinute1: number;
    endMinute1: number;
    startMinute2: number;
    endMinute2: number;
    startHour1: number;
    endHour1: number;
    startHour2: number;
    endHour2: number;

    commerceBookings: Booking[]

    constructor(
        public alertController: AlertController,
        private alertService: AlertService,
        private commerceService: CommerceService,
        private router: Router,
        private route: ActivatedRoute,
        private boookingService: BookingService,
        private localStorageService: LocalStorageService,
        private timetableService: TimetableService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.client = new Client(this.localStorageService.getObject('client'));
        console.log(this.client);
    }

    ionViewWillEnter() {
        this.route.paramMap.subscribe(
            (params: Params) => {
                this.hour = params.params.id;
                console.log('this.hour', this.hour);
                const commerceId: number = +this.localStorageService.getObject('commerceId');

                // Traer tabla de horarios
                this.timetableService.getTimetable()
                    .then((resp: any) => {
                        this.timetable = resp.result;
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

                // Traer comercio por ID
                this.commerceService.getCommerceById(commerceId)
                    .then((resp: any) => {
                        if (resp.result.length < 1) {
                            this.router.navigate(['/tabs/home']);
                            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                        }
                        this.commerce = resp.result[0];

                        // Busco los bookings del comercio actual
                        this.authService.getBookingsByCommerce(commerceId)
                            .then(
                                resp => {
                                    console.clear();
                                    this.commerceBookings = resp.result.filter(
                                        booking =>
                                            // Filtro aquellos que no corresponden al día de hoy
                                            this.whatDayIsIt === new Date(moment(booking.created, "YYYY-MM-DDTHH:mm:ss").toISOString()).toLocaleDateString()
                                    );
                                    this.manageWorkHours();
                                }
                            )
                            .catch(err => {
                                console.log('err', err);
                                if (err && err.error && err.error.status === -1) {
                                    this.alertService.simpleAlert(err.error.message);
                                } else {
                                    this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                                }
                                this.router.navigate(['/tabs/home']);
                            });
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

            })
    }

    manageWorkHours = () => {
        // Guardo los minutos y las horas de apertura y cierre 
        this.startMinute1 = asDate(this.commerce.openTime1).getMinutes();
        this.endMinute1 = asDate(this.commerce.closeTime1).getMinutes();
        this.startMinute2 = this.commerce.openTime2 === null ? undefined : asDate(this.commerce.openTime2).getMinutes();
        this.endMinute2 = this.commerce.closeTime2 === null ? undefined : asDate(this.commerce.closeTime2).getMinutes();

        this.startHour1 = asDate(this.commerce.openTime1).getHours();
        this.endHour1 = asDate(this.commerce.closeTime1).getHours();
        this.startHour2 = this.commerce.openTime2 === null ? undefined : asDate(this.commerce.openTime2).getHours();
        this.endHour2 = this.commerce.closeTime2 === null ? undefined : asDate(this.commerce.closeTime2).getHours();

        // Verifico que no vaya a venir cero o un numero incorrecto;
        if (this.commerce.shoppingMinutes < 1) this.commerce.shoppingMinutes = 1;
        this.shifts = [];
        for (var i = 0; i < 6 / this.commerce.shoppingMinutes; i++) {
            this.shifts.push(this.commerce.shoppingMinutes * i * 10);
        }
        if (this.hour == this.startHour1) {
            this.shifts = this.shifts.filter(elem => elem >= this.startMinute1);
            console.log('Estamos en la hora de apertura 1');
        };
        if (this.hour == this.endHour1) {
            this.shifts = this.shifts.filter(elem => elem < this.endMinute1);
            console.log('Estamos en la hora de cierre 1');
        };
        if (this.startHour2 && this.hour == this.startHour2) {
            this.shifts = this.shifts.filter(elem => elem >= this.startMinute2);
            console.log('Estamos en la hora de apertura 2');
        };
        if (this.endHour2 && this.hour == this.endHour2) {
            this.shifts = this.shifts.filter(elem => elem < this.endMinute2);
            console.log('Estamos en la hora de cierre 2');
        };

        // Filtrar los shifts ya reservados

        // 1ro busco los timetables ocupados
        const busyTimetables = this.timetable
            .filter(
                tt => this.commerceBookings
                    .some(
                        elem => elem.timetableId === tt.id
                    )
            );

        const { maxClients } = this.commerce;

        // Despues seteo los shifts ocupados
        this.shifts = this.shifts.map(
            shift => {
                const currentTimeTable = busyTimetables
                    .find(
                        btt => btt.description == `${formatHHmm(this.hour)}:${formatHHmm(shift)}:00`
                    );

                const cantBusy = this.commerceBookings
                    .reduce(
                        (acum, current) => currentTimeTable && currentTimeTable.id === current.timetableId ?
                            acum + 1 : acum,
                        0
                    )

                return {
                    value: shift,
                    fa: `${formatHHmm(this.hour)}:${formatHHmm(shift)}:00`,
                    busy: cantBusy >= maxClients
                }
            }
        )

    }

    radioGroupChange(event: any) {
        const selectedTimetable = this.timetable.filter(
            element =>
                element.description == `${formatHHmm(this.hour)}:${formatHHmm(event.detail.value)}:00`
        );
        this.selectedTimetable = selectedTimetable[0];
        this.selectedMinutes = formatHHmm(event.detail.value);
    }

    doSubmit = () => {
        const booking: BookingRegister = {
            userId: this.client.id,
            commerceId: this.commerce.id,
            timetableId: this.selectedTimetable.id,
        }
        this.boookingService.createBooking(booking)
            .then((resp: any) => {
                const { message } = resp;
                this.alertService.headerAlert('Agendado!', message)
                this.router.navigate(['/tabs/home'])
            })
            .catch(err => {
                console.log('err', err);
                if (err.error.status == -1) {
                    this.alertService.simpleAlert(err.error.message);
                    this.router.navigate(['/tabs/home'])
                } else {
                    this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                }
            });
    }

    async confirm() {
        const alert = await this.alertController.create({
            header: `Turno en:`,
            subHeader: this.commerce.shopName,
            message: `Horario : ${this.hour}:${this.selectedMinutes}`,
            cssClass: `alert-user`,
            buttons: [
                { text: `Revisar`, role: 'cancel', },
                { text: `Confirmar`, handler: () => this.doSubmit() }
            ]
        });

        await alert.present();
    }

}
