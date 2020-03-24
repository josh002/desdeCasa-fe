import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService';
import { NavController, LoadingController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { Client } from 'src/app/models/client.model';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loadingService';
import { UtilsService } from 'src/app/services/utils.service';
import { Locality } from 'src/app/models/locality.model';
import { Department } from 'src/app/models/department.model';
import { Street } from 'src/app/models/street.model';
import * as moment from 'moment';
import * as crypto from 'crypto-js';

@Component({
    selector: 'app-commerce',
    templateUrl: './commerce.page.html',
    styleUrls: ['./commerce.page.scss'],
})

export class CommercePage implements OnInit {
    client = new Client();
    accountSubmit = new Client();
    desperationLevel: number;
    usesFacebook: boolean = false;
    usesInstagram: boolean = false;
    usesTwitter: boolean = false;
    confirmPassword: string;
    localities: Locality[];
    departments: Department[];
    streets: Street[];
    departamentId: number;
    minDate: moment.Moment | string = moment(new Date()).subtract(12, 'years').toISOString();

    customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
    customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
    customMonthShortNames = ['Ene', 'Feb', 'Mar', 'Abr', ' May', ' Jun', ' Jul', ' Ago', ' Sep', ' Oct', ' Nov', ' Dic'];

    constructor(
        private loginService: LoginService,
        private alertService: AlertService,
        private utilsService: UtilsService,
        private router: Router,
        public navCtrl: NavController,
        public loadingService: LoadingService,
        public popoverController: PopoverController
    ) { }

    ngOnInit() {
        this.desperationLevel = 0;
        // this.client = this.testAccount;

        this.utilsService.getDepartment()
            .then((resp: any) => { this.departments = resp.departamentos; })
            .catch(err => { console.log(err); })
    }

    testMe() {
    }

    desperateUser() {
        this.desperationLevel = ++this.desperationLevel;
        console.log(`Im this desperate: ${this.desperationLevel}`);
    }

    getLocalities() {
        this.utilsService.getLocality(this.departamentId)
            .then((resp: any) => {
                this.localities = resp.localidades;
                console.log(this.localities);
            })
            .catch(err => { console.log(err); })
    }

    getStreets() {
        // Es muy complicado de implementar la normalización de calles
        this.utilsService.getStreet(this.client.localidadId)
            .then((resp: any) => {
                console.log(resp);
                this.streets = resp.calles;
                console.log(this.streets);
            })
            .catch(err => { console.log(err); })
    }

    onSubmit() {
        // Usar el formateador de la clase commerce
        // this.formatData();

        this.loadingService.presentLoading("Cargando")
            .then(
                (resp: any) => {
                    this.loginService.register(this.accountSubmit)
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status === 0) {
                                    const { message } = resp;
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
                            this.alertService.simpleAlert(err.error.message)
                            console.log(err);
                        })
                }
            )
    }

}


/**
 * Encripta un password en sha256
 * @param {*} password 
 */
const encryptPass = password => crypto.SHA256(password).toString()