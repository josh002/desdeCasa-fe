import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { ClientRegister } from 'src/app/models/client-register.interface';
import { LoadingService } from 'src/app/services/loadingService';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/client.model';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { addressHelperText, addressInputHelperText } from 'src/app/constants/constants';
import { UtilsService } from 'src/app/services/utils.service';
import { Department } from 'src/app/models/department.model';
import { Province } from 'src/app/models/province.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    readonly addressInputHelperText = addressInputHelperText;

    disableHelper: boolean = false;
    desperationLevel: number = 0;
    provinces: Province[];
    departments: Department[];
    selectedProvince: Province;
    selectedDepartment: Department;
    selectedProvinceName: string;
    selectedDepartmentName: string;
    disabled: boolean = true;
    disabledPass: boolean = true;
    togglePass: boolean = false;
    newPassword: string = "";
    actualPassword: string = "";

    client: Client = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        dni: undefined,
        address: '',
        latitude: null,
        longitude: null
    };

    constructor(
        private authService: AuthService,
        private loadingService: LoadingService,
        private alertService: AlertService,
        private router: Router,
        private localStorageService: LocalStorageService,
        private utilsService: UtilsService,
    ) { }


    ngOnInit() { }

    ionViewWillEnter() {
        this.client = this.localStorageService.getObject('client');
        this.guessMyLocation();
        this.newPassword = "";
        this.actualPassword = "";
        this.disabled = true;
        this.disabledPass = true;
    }

    guessMyLocation() {
        const addressArray = this.client.address.split(', ');
        const guessedAddress: string = addressArray[0];
        const guessedDepartment: string = addressArray[1];
        const guessedProvince: string = addressArray[2];

        this.client.address = guessedAddress.trim();
        console.log('Split me in three!', addressArray)
        this.utilsService.getProvince()
            .then((resp: any) => {
                this.provinces = [];
                resp.provincias.forEach(element => this.provinces.push(new Province(element)));
                const filteredProvince: Province[] = this.provinces.filter(elem => guessedProvince ? guessedProvince == elem.nombre : false);
                this.selectedProvince = filteredProvince.length > 0 ? filteredProvince[0] : undefined;
                this.selectedProvinceName = this.selectedProvince ? this.selectedProvince.nombre : undefined;
                console.log(this.provinces);
                console.log('this.selectedProvince', this.selectedProvince);
                console.log('this.selectedProvinceName', this.selectedProvinceName);
                if (this.selectedProvince) {

                    // Si es CABA tengo que traer localidades en lugar de departamentos
                    if (this.selectedProvinceName && this.selectedProvinceName == "Ciudad Autónoma de Buenos Aires") {
                        console.log('Es CABA');
                        this.utilsService.getLocality({ provinceId: this.selectedProvince.id })
                            .then((resp: any) => {
                                this.departments = [];
                                resp.localidades.forEach(element => this.departments.push(new Department(element)));
                                const filteredDepartment: Department[] = this.departments.filter(elem => guessedDepartment ? guessedDepartment == elem.nombre : false);
                                this.selectedDepartment = filteredDepartment.length > 0 ? filteredDepartment[0] : undefined;
                                this.selectedDepartmentName = this.selectedDepartment ? this.selectedDepartment.nombre : undefined;
                                console.log(this.departments);
                            })
                            .catch(err => { console.log(err); })
                    } else {
                        console.log('No es CABA');
                        this.utilsService.getDepartment(this.selectedProvince.id)
                            .then((resp: any) => {
                                this.departments = [];
                                resp.departamentos.forEach(element => this.departments.push(new Department(element)));
                                const filteredDepartment: Department[] = this.departments.filter(elem => guessedDepartment ? guessedDepartment == elem.nombre : false);
                                this.selectedDepartment = filteredDepartment.length > 0 ? filteredDepartment[0] : undefined;
                                this.selectedDepartmentName = this.selectedDepartment ? this.selectedDepartment.nombre : undefined;
                                console.log(this.departments);
                            })
                            .catch(err => { console.log(err); })
                    }
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

    changeDisabled() {
        this.disabled = !this.disabled;
    }
    changeDisabledPass() {
        this.disabledPass = !this.disabledPass;
    }

    togglePassword() {
        this.togglePass = !this.togglePass;
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
        console.log('form', form);
        this.loadingService.presentLoading("Cargando")
            .then(
                (resp: any) => {
                    const temporaryClient: Client = new Client({
                        ...this.client,
                        address: `${this.client.address}, ${this.selectedDepartment.nombre}, ${this.selectedProvince.nombre}, Argentina`
                    });
                    this.authService.editUser(temporaryClient)
                        .then(
                            (resp: any) => {
                                this.loadingService.dismissLoading();
                                if (resp && resp.status === 0) {
                                    const { message } = resp;
                                    this.localStorageService.setObject('client', temporaryClient);
                                    this.disabled = true;
                                    this.alertService.headerAlert('Exito', message)
                                    this.router.navigate(['/tabs/home'])
                                } else {
                                    if (resp.error) {
                                        this.alertService.simpleAlert(resp.error.message)
                                    }
                                }
                            }
                        )
                        .catch(err => {
                            this.changeDisabled();
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


    resetPassword(form: any) {
        this.desperationLevel = 0;




    }


}
