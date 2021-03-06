import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { NavController, PopoverController, PickerController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loadingService';
import { UtilsService } from 'src/app/services/utils.service';
import { GeolocationService } from 'src/app/services/geolocationService';
import { CommerceService } from 'src/app/services/commerce.service';
import { Commerce, CommerceRegister, formatCommerce } from 'src/app/models/commerce.model';
import { addressHelperText, addressInputHelperText, asDate } from 'src/app/constants/constants';
import * as moment from 'moment';
import { Province } from 'src/app/models/province.model';
import { Department } from 'src/app/models/department.model';
import { fromDatetimePickerToMinutesInDay } from 'src/app/constants/constants'
import { from } from 'rxjs';

@Component({
    selector: 'app-commerce',
    templateUrl: './commerce.page.html',
    styleUrls: ['./commerce.page.scss'],
})

export class CommercePage implements OnInit {
    readonly addressInputHelperText = addressInputHelperText;

    disableHelper: boolean = false;
    desperationLevel: number;
    provinces: Province[];
    departments: Department[];
    selectedProvince: Province;
    selectedDepartment: Department;
    selectedProvinceName: string;
    selectedDepartmentName: string;

    commerce: CommerceRegister = {
        email: '',
        cuitCuil: '',
        password: '',
        shopName: '',
        address: '',
        maxClients: undefined,
        phone: undefined,
        splitShift: true,
        openTime1: new Date('1994-12-15T08:30').toString(),
        closeTime1: new Date('1994-12-15T13:30').toString(),
        openTime2: new Date('1994-12-15T16:00').toString(),
        closeTime2: new Date('1994-12-15T20:00').toString(),
        shoppingMinutes: undefined,
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
    //     openTime1: new Date('1994-12-15T08:30').toString(),
    //     closeTime1: new Date('1994-12-15T13:30').toString(),
    //     openTime2: new Date('1994-12-15T16:00').toString(),
    //     closeTime2: new Date('1994-12-15T20:00').toString(),
    //     shoppingMinutes: 1,
    // };

    // Arreglo de posibles duraciones de turnos
    shiftDurations: number[][] = [
        [10, 20, 30, 60]
    ];
    // Arreglo de posible cantidad de clientes
    clientsMax: number[][] = [
        []
    ];

    constructor(
        private alertService: AlertService,
        private router: Router,
        private geolocationService: GeolocationService,
        private commerceService: CommerceService,
        private utilsService: UtilsService,
        public navCtrl: NavController,
        public loadingService: LoadingService,
        public popoverController: PopoverController,
        public pickerController: PickerController
    ) { }

    ngOnInit() {
        this.desperationLevel = 0;
        this.utilsService.getProvince()
            .then((resp: any) => {
                this.provinces = [];
                resp.provincias.forEach(element => this.provinces.push(new Province(element)));
                console.log(this.provinces);
            })
            .catch(err => { console.log(err); })
    }

    ionViewWillEnter() {

        // Setea localización actual del usuario en address
        this.geolocationService.getCurrentLocation()
            .then(latLong => { return this.utilsService.cordsToAddress(latLong) })
            .then(({ formatted_address }) => this.commerce.address = formatted_address.substring(0, formatted_address.indexOf(',')))
        for (var i = 1; i < 60; i++) {
            this.clientsMax[0].push(i);
        }
    }

    desperateUser() {
        this.desperationLevel = this.desperationLevel ? ++this.desperationLevel : 0;
        console.log(`Im this desperate: ${this.desperationLevel}`);
    }

    addressHelper() {
        if (!this.disableHelper) this.alertService.simpleAlert(addressHelperText);
        this.disableHelper = true;
    }

    onProvinceChange() {
        this.selectedDepartmentName = undefined;
        this.selectedDepartment = undefined;
        this.selectedProvince = this.selectedProvinceName ? this.provinces.filter(elem => this.selectedProvinceName == (elem.nombre))[0] : undefined;
        console.log(this.selectedProvince);
        console.log('selectedProvinceName', this.selectedProvinceName);
        // Si es CABA tengo que traer localidades en lugar de departamentos
        if (this.selectedProvinceName && this.selectedProvinceName == "Ciudad Autónoma de Buenos Aires") {
            console.log('Es CABA');
            this.utilsService.getLocality({ provinceId: this.selectedProvince.id })
                .then((resp: any) => {
                    this.departments = [];
                    resp.localidades.forEach(element => this.departments.push(new Department(element)));
                    console.log(this.departments);
                })
                .catch(err => { console.log(err); })
        } else {
            console.log('No es CABA');
            this.utilsService.getDepartment(this.selectedProvince.id)
                .then((resp: any) => {
                    this.departments = [];
                    resp.departamentos.forEach(element => this.departments.push(new Department(element)));
                    console.log(this.departments);
                })
                .catch(err => { console.log(err); })
        }
    }

    onDepartmentChange() {
        this.selectedDepartment = this.selectedDepartmentName ? this.departments.filter(elem => this.selectedDepartmentName == elem.nombre)[0] : undefined;
        console.log('selectedDepartmentName', this.selectedDepartmentName);
        console.log('selectedDepartment', this.selectedDepartment);
    }

    onSubmit(form: any) {
        this.desperationLevel = 0;

        if (fromDatetimePickerToMinutesInDay(this.commerce.openTime1) > fromDatetimePickerToMinutesInDay(this.commerce.closeTime1)) {
            this.alertService.simpleAlert('La primer hora de cierre no puede ser menor que la primer hora de apertura');
            return
        }
        if (this.commerce.splitShift) {
            if (fromDatetimePickerToMinutesInDay(this.commerce.closeTime1) > fromDatetimePickerToMinutesInDay(this.commerce.openTime2)) {
                this.alertService.simpleAlert('La segunda hora de apertura no puede ser menor que la primer hora de cierre');
                return
            }
        }
        if (this.commerce.splitShift) {
            if (fromDatetimePickerToMinutesInDay(this.commerce.openTime2) > fromDatetimePickerToMinutesInDay(this.commerce.closeTime2)) {
                this.alertService.simpleAlert('La segunda hora de cierre no puede ser menor que la segunda hora de apertura');
                return
            }
        }


        console.log('form', form);
        this.loadingService.presentLoading("Cargando")
            .then(
                () => {
                    const temporaryCommerce: CommerceRegister = {
                        ...this.commerce,
                        address: `${this.commerce.address}, ${this.selectedDepartment.nombre}, ${this.selectedProvince.nombre}, Argentina`
                    };
                    this.commerceService.register(formatCommerce(temporaryCommerce))
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status === 0) {
                                    const { message } = resp;
                                    console.log(form.reset());
                                    this.alertService.headerAlert('Exito', message)
                                    this.router.navigate(['/start'])
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