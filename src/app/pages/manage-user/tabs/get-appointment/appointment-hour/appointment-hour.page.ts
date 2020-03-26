import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { CommerceService } from 'src/app/services/commerce.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Commerce } from 'src/app/models/commerce.model';
import { Timetable } from 'src/app/models/timetable.model';
import { BookingService } from 'src/app/services/booking.service';
import { TimetableService } from 'src/app/services/timetable.service';
import { formatHHmm } from 'src/app/constants/constants';
import { BookingRegister } from 'src/app/models/booking.model';
import { Client } from 'src/app/models/client.model';
import { LocalStorageService } from 'src/app/services/localStorageService';

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
    shifts: number[] = []; // Arreglo con turnos

    constructor(
        public alertController: AlertController,
        private alertService: AlertService,
        private commerceService: CommerceService,
        private router: Router,
        private route: ActivatedRoute,
        private boookingService: BookingService,
        private localStorageService: LocalStorageService,
        private timetableService: TimetableService
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
                        console.log(err);
                        if (err.error.status === -1) {
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
                        // Verifico que no vaya a venir cero o un numero incorrecto;
                        if (this.commerce.shoppingMinutes < 1) this.commerce.shoppingMinutes = 1;
                        for (var i = 0; i < 6 / this.commerce.shoppingMinutes; i++) {
                            this.shifts.push(this.commerce.shoppingMinutes * i * 10);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        if (err.error.status === -1) {
                            this.alertService.simpleAlert(err.error.message);
                        } else {
                            this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                        }
                        this.router.navigate(['/tabs/home']);
                    });

            })
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
                console.log(err);
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
