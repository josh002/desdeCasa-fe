import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { NavController, LoadingController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loadingService';
import { UtilsService } from 'src/app/services/utils.service';
import { encryptPass } from 'src/app/constants/constants'
import { GeolocationService } from 'src/app/services/geolocationService';
import { ClientRegister } from 'src/app/models/client-register.interface';
import { addressHelperText, addressInputHelperText } from 'src/app/constants/constants';
import { Province } from 'src/app/models/province.model';
import { Department } from 'src/app/models/department.model';
import { faThemeisle } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-client',
    templateUrl: './client.page.html',
    styleUrls: ['./client.page.scss'],
})
export class ClientPage implements OnInit {
    readonly addressInputHelperText = addressInputHelperText;
    @ViewChild('myForm',{ static: false }) formValues; 

    client: ClientRegister = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dni: undefined,
        address: '',
    };
    disableHelper: boolean = false;
    desperationLevel: number;
    selectedProvince: Province;
    selectedDepartment: Department;
    provinces: Province[];
    departments: Department[];

    // client: ClientRegister = {
    //     email: 'cmartinez@eon6.tech',
    //     password: '12344567',
    //     firstName: 'Cristian',
    //     lastName: 'Martínez',
    //     dni: 12345678,
    //     address: 'Falsa 123',
    // };

    constructor(
        private alertService: AlertService,
        private utilsService: UtilsService,
        private router: Router,
        public navCtrl: NavController,
        public loadingService: LoadingService,
        public popoverController: PopoverController,
        public geolocationService: GeolocationService,
        public authService: AuthService,
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
            .then(({ formatted_address }) => this.client.address = formatted_address.substring(0, formatted_address.indexOf(',')))
    }

    desperateUser() {
        this.desperationLevel = ++this.desperationLevel;
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

    onSubmit(form: any) {
        this.desperationLevel = 0;
        console.log('form', form);
        // Formatear con el método de la clase correspondiente
        // this.formatData();
        this.loadingService.presentLoading("Cargando")
            .then(
                (resp: any) => {
                    const temporaryClient: ClientRegister = {
                        ...this.client,
                        address: `${this.client.address}, ${this.selectedDepartment.nombre}, ${this.selectedProvince.nombre}, Argentina`
                    };
                    this.authService.register(temporaryClient)
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
}




