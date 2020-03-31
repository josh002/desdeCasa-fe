import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authService';
import { Client } from 'src/app/models/client.model';
import { AlertService } from 'src/app/services/alertService';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recover',
    templateUrl: './recover.page.html',
    styleUrls: ['./recover.page.scss'],
})
export class RecoverPage implements OnInit {
    // client = new Client();

    constructor(
        public authService: AuthService,
        private alertService: AlertService,
        private router: Router,
    ) { }

    ngOnInit() { }

    // onClickEnviarCorreo = () => 
    //     this.authService.resetPassword(this.client.email)
    //         .then(
    //             resp => {
    //                 this.alertService.simpleAlert(resp.message);
    //                 this.router.navigate(['/login']);
    //             }
    //         )
    //         .catch(
    //             err => this.alertService.simpleAlert(err.message)
    //         )
    
}
