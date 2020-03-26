import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { NavController, PopoverController, PickerController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loadingService';
import { UtilsService } from 'src/app/services/utils.service';
// import { GeolocationService } from 'src/app/services/geolocationService';
import { CommerceService } from 'src/app/services/commerce.service';
import { Commerce, CommerceRegister, formatCommerce } from 'src/app/models/commerce.model';
import { LocalStorageService } from 'src/app/services/localStorageService';
@Component({
  selector: 'app-edit-commerce',
  templateUrl: './edit-commerce.page.html',
  styleUrls: ['./edit-commerce.page.scss'],
})
export class EditCommercePage implements OnInit {
    commerce: Commerce = {
        email: '',
        cuitCuil: '',
        password: '',
        shopName: '',
        address: '',
        maxClients: undefined,
        phone: undefined,
        splitShift: false,
        openTime1: new Date('1994-12-15T08:30').toISOString(),
        closeTime1: new Date('1994-12-15T13:30').toISOString(),
        openTime2: new Date('1994-12-15T16:00').toISOString(),
        closeTime2: new Date('1994-12-15T20:00').toISOString(),
        shoppingMinutes: undefined,
        latitude: null,
        longitude: null,
        id: null
    };

    // Esto está armado para propósitos de TESTING
    // commerce: CommerceRegister = {
    //     email: 'cmartinez@eon5.tech',
    //     cuitCuil: '20-3456884-0',
    //     password: 'doremifasol',
    //     shopName: 'Pepito SHOP!',
    //     address: 'French 1425',
    //     maxClients: 5,
    //     phone: 123456789,
    //     splitShift: false,
    //     openTime1: new Date('1994-12-15T08:30').toISOString(),
    //     closeTime1: new Date('1994-12-15T13:30').toISOString(),
    //     openTime2: new Date('1994-12-15T16:00').toISOString(),
    //     closeTime2: new Date('1994-12-15T20:00').toISOString(),
    //     shoppingMinutes: 1,
    // };

    // Arreglo de posibles duraciones de turnos
    shiftDurations: number[][] = [
        [10, 20, 30, 40, 50, 60]
    ];
    // Arreglo de posible cantidad de clientes
    clientsMax: number[][] = [
        []
    ];

    desperationLevel: number;
    constructor(
        private alertService: AlertService,
        private router: Router,
        // private geolocationService: GeolocationService,
        private commerceService: CommerceService,
        private utilsService: UtilsService,
        public navCtrl: NavController,
        public loadingService: LoadingService,
        public localStorageService: LocalStorageService,
        public popoverController: PopoverController,
        public pickerController: PickerController
    ) { }

    ngOnInit() {
        this.desperationLevel = 0;
        // Setea localización actual del usuario en address
        // this.geolocationService.getCurrentLocation()
        //     .then(latLong => { return this.utilsService.cordsToAddress(latLong) })
        //     .then(({ formatted_address }) => this.commerce.address = formatted_address)
        for (var i = 1; i < 60; i++) {
            this.clientsMax[0].push(i);
        }

        this.commerce = this.localStorageService.getObject('commerce');
    }

    desperateUser() {
        this.desperationLevel = ++this.desperationLevel;
        console.log(`Im this desperate: ${this.desperationLevel}`);
    }

    onSubmit() {
        this.desperationLevel = 0;
        this.loadingService.presentLoading("Cargando")
            .then(
                () => {
                    this.commerceService.editCommerce(this.commerce)
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status === 0) {
                                    const { message } = resp;
                                    this.alertService.headerAlert('Exito', message)
                                    this.router.navigate(['/manage-commerce/commerce-tabs/schedule'])
                                } else {
                                    if (resp.error) {
                                        this.alertService.simpleAlert(resp.error.message)
                                    }
                                }
                            }
                        )
                        .catch(err => {
                            this.loadingService.dismissLoading();
                            console.log('err', err);
                            if (err && err.error && err.error.status === -1) {
                                this.alertService.simpleAlert(err.error.message);
                            } else {
                                this.alertService.simpleAlert("Ocurrió un error inesperado. Intente más tarde.");
                            }
                        })

                }
            )
    }

    // Picker numérico y sus controles asociados

    async shoppingMinutesPicker(numColumns = 1, numOptions = this.shiftDurations[0].length, columnOptions = this.shiftDurations) {
        const picker = await this.pickerController.create({
            columns: this.getColumns(numColumns, numOptions, columnOptions),
            buttons: [
                {
                    text: 'Ok',
                    handler: (value) => {
                        this.commerce.shoppingMinutes = +value['col-0'].value;
                        console.log(`Picked Value`, value);
                    }
                }
            ]
        });

        await picker.present();
    }

    async maxClientsPicker(numColumns = 1, numOptions = this.clientsMax[0].length, columnOptions = this.clientsMax) {
        const picker = await this.pickerController.create({
            columns: this.getColumns(numColumns, numOptions, columnOptions),
            buttons: [
                {
                    text: 'Ok',
                    handler: (value) => {
                        this.commerce.maxClients = +value['col-0'].value;
                        console.log(`Picked Value`, value);
                    }
                }
            ]
        });

        await picker.present();
    }

    getColumns(numColumns, numOptions, columnOptions) {
        let columns = [];
        for (let i = 0; i < numColumns; i++) {
            columns.push({
                name: `col-${i}`,
                options: this.getColumnOptions(i, numOptions, columnOptions)
            });
        }

        return columns;
    }

    getColumnOptions(columnIndex, numOptions, columnOptions) {
        let options = [];
        for (let i = 0; i < numOptions; i++) {
            options.push({
                text: columnOptions[columnIndex][i % numOptions],
                value: columnOptions[columnIndex][i % numOptions]
            })
        }

        return options;
    }

}
