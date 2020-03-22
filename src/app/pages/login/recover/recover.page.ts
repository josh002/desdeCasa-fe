import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/loginService';
import { Account } from 'src/app/models/account.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.page.html',
    styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
    account = new Account();

    constructor(
        public loginService: LoginService,
        private alertService: AlertService,
        private router: Router,
    ) { }

    ngOnInit() { }

    onClickEnviarCorreo = () => 
        this.loginService.resetPassword(this.account.email)
            .then(
                resp => {
                    this.alertService.simpleAlert(resp.message);
                    this.router.navigate(['/login']);
                }
            )
            .catch(
                err => this.alertService.simpleAlert(err.message)
            )
    
}
