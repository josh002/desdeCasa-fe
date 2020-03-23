import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService';
import { NavController, LoadingController, PopoverController } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { Account } from 'src/app/models/account.model';
import { Router } from '@angular/router';
import { LoadingService } from 'src/app/services/loadingService';
import { Category } from 'src/app/models/category.model';
import { Thread } from 'src/app/models/thread.model';
import { Product } from 'src/app/models/product.class';
import { Province } from 'src/app/models/province.model';
import { PopoverCategoryComponent } from 'src/app/shared/popover-category/popover-category.component';
import { Study } from 'src/app/models/study.model';
import { Job } from 'src/app/models/job.model';
import { PoliticalParty } from 'src/app/models/politicalParty.model';
import { UtilsService } from 'src/app/services/utils.service';
import { Locality } from 'src/app/models/locality.model';
import { Department } from 'src/app/models/department.model';
import { Street } from 'src/app/models/street.model';
import * as moment from 'moment';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
    account = new Account();
    accountSubmit = new Account();
    desperationLevel: number;
    usesFacebook: boolean = false;
    usesInstagram: boolean = false;
    usesTwitter: boolean = false;
    confirmPassword: string;
    studies: Study[];
    jobs: Job[];
    politicalParties: PoliticalParty[];
    localities: Locality[];
    departments: Department[];
    streets: Street[];
    departamentId: number;
    minDate: moment.Moment | string = moment(new Date()).subtract(12, 'years').toISOString();

    customYearValues = [2020, 2016, 2008, 2004, 2000, 1996];
    customDayShortNames = ['s\u00f8n', 'man', 'tir', 'ons', 'tor', 'fre', 'l\u00f8r'];
    customMonthShortNames = ['Ene', 'Feb', 'Mar', 'Abr', ' May', ' Jun', ' Jul', ' Ago', ' Sep', ' Oct', ' Nov', ' Dic'];

    mask = ['(', /\d/, /\d/, ')'];
    masks = {
        phoneMobile: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        phoneLandline: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    };

    public customPatterns = {
        'x': { pattern: new RegExp('\[0-9\]') },
        'y': { pattern: new RegExp('\[0-9\]?'), optional: false },
        '0': { pattern: new RegExp('\[0\]') },
        '1': { pattern: new RegExp('\[1\]') },
        '5': { pattern: new RegExp('\[5\]') },
    };

    testAccount: Account = {
        username: `Cristian${Math.floor((Math.random() * 999))}`,
        email: `cristian_${Math.floor((Math.random() * 999))}@eon6.tech`,
        firstName: "Cristian",
        lastName: "DUrbano",
        password: "doremifasol",
        dni: Math.floor(1000000 * (Math.random() * (40 - 2) + 2)),
        birthDate: undefined,
        phoneMobile: 3410000000 + Math.floor(10000000 * Math.random()),
        phoneLandline: 3414000000 + Math.floor(1000000 * Math.random()),
        politicalPartyId: [6, 7],
        studiesId: Math.floor((Math.random() * (10 - 1) + 1)),
        jobId: Math.floor((Math.random() * (115 - 1) + 1)),
        adresslocationId: undefined,
        localidadId: 82126010,
        adressStreet: `Calle ${Math.floor((Math.random() * (1000 - 1) + 1))}`,
        adressHouseNumber: `${Math.floor((Math.random() * (10000 - 1) + 1))}`,
        afiliated: Math.random() < 0.5,
        facebook: "@facebook",
        instagram: "@instagram",
        twitter: "@twitter"
    };

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
        // this.account = this.testAccount;
        this.utilsService.getJob()
            .then((resp: any) => { this.jobs = resp.result; })
            .catch(err => { console.log(err); })

        this.utilsService.getStudy()
            .then((resp: any) => { this.studies = resp.result; })
            .catch(err => { console.log(err); })

        this.utilsService.getPoliticalParty()
            .then((resp: any) => { this.politicalParties = resp.result; })
            .catch(err => { console.log(err); })

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
        this.utilsService.getStreet(this.account.localidadId)
            .then((resp: any) => {
                console.log(resp);
                this.streets = resp.calles;
                console.log(this.streets);
            })
            .catch(err => { console.log(err); })
    }

    onSubmit() {
        this.formatData();

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

    formatData() {
        let re1 = /\(|\) 15|-/gi;    // RegExp para buscar los caracateres "(", ") 15" o "-" y quitarlos
        let re2 = /\(|\) |-/gi;    // RegExp para buscar los caracateres "(", ") " o "-" y quitarlos

        this.accountSubmit = Object.assign({}, this.account);
        this.accountSubmit.birthDate = moment(this.account.birthDate).format('YYYY-MM-DD');
        this.accountSubmit.username = this.account.username.trim();
        this.accountSubmit.email = this.account.email.trim();
        this.accountSubmit.firstName = this.account.firstName.trim();
        this.accountSubmit.lastName = this.account.lastName.trim();
        this.accountSubmit.password = this.account.password.trim();
        this.accountSubmit.dni = +this.account.dni;
        this.accountSubmit.phoneMobile = +this.account.phoneMobile.toString().replace(re1,'');
        this.accountSubmit.adressStreet = this.account.adressStreet.trim();
        this.accountSubmit.adressHouseNumber = this.account.adressHouseNumber.trim();
        if (this.accountSubmit.phoneLandline) this.accountSubmit.phoneLandline = +this.account.phoneLandline.toString().replace(re2,'');
        if (this.accountSubmit.facebook) this.accountSubmit.facebook = this.account.facebook.trim();
        if (this.accountSubmit.instagram) this.accountSubmit.instagram = this.account.instagram.trim();
        if (this.accountSubmit.twitter) this.accountSubmit.twitter = this.account.twitter.trim();
        console.log(this.account);
        console.log(this.accountSubmit);
    }

}


/**
 * Encripta un password en sha256
 * @param {*} password 
 */
const encryptPass = password => crypto.SHA256(password).toString()