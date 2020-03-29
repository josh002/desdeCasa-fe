import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { NavController, PopoverController, PickerController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loadingService';
import { UtilsService } from 'src/app/services/utils.service';
import { CommerceService } from 'src/app/services/commerce.service';
import { Commerce, CommerceRegister, formatCommerce } from 'src/app/models/commerce.model';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { addressHelperText, addressInputHelperText } from 'src/app/constants/constants';
import * as moment from 'moment';
import { Province } from 'src/app/models/province.model';
import { Department } from 'src/app/models/department.model';

@Component({
    selector: 'app-edit-commerce',
    templateUrl: './edit-commerce.page.html',
    styleUrls: ['./edit-commerce.page.scss'],
})
export class EditCommercePage implements OnInit {
    readonly addressInputHelperText = addressInputHelperText;

    disableHelper: boolean = false;
    desperationLevel: number = 0;
    selectedProvince: Province;
    selectedDepartment: Department;
    provinces: Province[];
    departments: Department[];
    editInfo: boolean = true;
    editconfig: boolean = true;

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
        [10, 20, 30, 60]
    ];
    // Arreglo de posible cantidad de clientes
    clientsMax: number[][] = [
        []
    ];

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
    }

    ionViewWillEnter() {
        this.commerce = new Commerce(this.localStorageService.getObject('commerce'));
        this.commerce.shoppingMinutes = this.commerce.shoppingMinutes * 10;
        this.guessMyLocation();
    }

    guessMyLocation() {
        const addressArray = this.commerce.address.split(', ');
        const guessedAddress: string = addressArray[0];
        const guessedDepartment: string = addressArray[1];
        const guessedProvince: string = addressArray[2];

        this.commerce.address = guessedAddress.trim();
        console.log('Split me in three!', addressArray)
        this.utilsService.getProvince()
            .then((resp: any) => {
                this.provinces = [];
                resp.provincias.forEach(element => this.provinces.push(new Province(element)));
                const filteredProvince: Province[] = this.provinces.filter(elem => guessedProvince ? guessedProvince.includes(elem.nombre) : false);
                this.selectedProvince = filteredProvince.length == 1 ? filteredProvince[0] : undefined;
                console.log(this.provinces);
                if (this.selectedProvince) {
                    this.utilsService.getDepartment(this.selectedProvince.id)
                        .then((resp: any) => {
                            this.departments = [];
                            resp.departamentos.forEach(element => this.departments.push(new Department(element)));
                            const filteredDepartment: Department[] = this.departments.filter(elem => guessedDepartment ? guessedDepartment.includes(elem.nombre) : false);
                            this.selectedDepartment = filteredDepartment.length == 1 ? filteredDepartment[0] : undefined;
                            console.log(this.departments);
                        })
                }
            })
            .catch(err => { console.log(err); })
    }

    desperateUser() {
        this.desperationLevel = this.desperationLevel ? ++this.desperationLevel : 0;
        console.log(`Im this desperate: ${this.desperationLevel}`);
    }

    addressHelper() {
        if (!this.disableHelper) this.alertService.simpleAlert(addressHelperText);
        this.disableHelper = true;
    }

    getDepartments() {
        this.selectedDepartment = undefined;
        this.utilsService.getDepartment(this.selectedProvince.id)
            .then((resp: any) => {
                this.departments = [];
                resp.departamentos.forEach(element => this.departments.push(new Department(element)));
                console.log(this.departments);
            })
            .catch(err => { console.log(err); })
    }

    changeDisabledinfo() {
        this.editInfo = !this.editInfo
        // this.commerce = new Commerce(this.localStorageService.getObject('commerce'));
    }
    changeDisabledconfig() {
        this.editconfig = !this.editconfig
        // this.commerce = new Commerce(this.localStorageService.getObject('commerce'));
    }

    onSubmit(form: any) {
        this.desperationLevel = 0;
        if (moment(this.commerce.openTime1).unix() > moment(this.commerce.closeTime1).unix()) {
            this.alertService.simpleAlert('La primer hora de cierre no puede ser menor que la primer hora de apertura');
            return
        }
        if (this.commerce.splitShift) if (moment(this.commerce.closeTime1).unix() > moment(this.commerce.openTime2).unix()) {
            this.alertService.simpleAlert('La segunda hora de apertura no puede ser menor que la primer hora de cierre');
            return
        }
        if (this.commerce.splitShift) if (moment(this.commerce.openTime2).unix() > moment(this.commerce.closeTime2).unix()) {
            this.alertService.simpleAlert('La segunda hora de cierre no puede ser menor que la segunda hora de apertura');
            return
        }
        console.log('form', form);
        this.loadingService.presentLoading("Cargando")
            .then(
                () => {
                    const temporaryCommerce = new Commerce({
                        ...this.commerce,
                        shoppingMinutes: (this.commerce.shoppingMinutes / 10),
                        address: `${this.commerce.address}, ${this.selectedDepartment.nombre}, ${this.selectedProvince.nombre}, Argentina`
                    });
                    this.commerceService.editCommerce(formatCommerce(temporaryCommerce))
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status === 0) {
                                    this.localStorageService.setObject('commerce', temporaryCommerce);
                                    this.editInfo = true;
                                    this.editconfig = true;
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
