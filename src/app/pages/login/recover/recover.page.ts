import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { Client } from 'src/app/models/client.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';
import { CommerceService } from 'src/app/services/commerce.service'
import { Commerce } from 'src/app/models/commerce.model';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.page.html',
    styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
    // client = new Client();
    email = "";
    isCommerce = false

    constructor(
        public authService: AuthService,
        private alertService: AlertService,
        private router: Router,
        public CommerceService: CommerceService
    ) { }

    ngOnInit() { }


    onClickEnviarCorreo = () => {
        if (this.isCommerce == true)
            this.CommerceService.resetPassword(this.email)
                .then(
                    resp => {
                        this.alertService.simpleAlert(resp.message);
                        this.router.navigate(['/start']);
                    }
                )
                .catch(
                    err => this.alertService.simpleAlert(err.message)
                )
        else
            this.authService.resetPassword(this.email)
                .then(
                    resp => {
                        this.alertService.simpleAlert(resp.message);
                        this.router.navigate(['/start']);
                    }
                )
                .catch(
                    err => this.alertService.simpleAlert(err.message)
                )
    }
}
