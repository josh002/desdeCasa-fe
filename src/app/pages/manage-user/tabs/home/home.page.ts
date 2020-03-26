import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { AuthService } from 'src/app/services/authService';
import { Commerce } from 'src/app/models/commerce.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

    commerces: any;

    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        const client = this.localStorageService.getObject('client');

        this.authService.getCommercesByUser(client.id)
            .then(
                commerces => {
                    this.commerces = commerces
                }
            )
    }

}
