import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/services/loadingService';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alertService';
import { Client } from 'src/app/models/client.model';
import { UtilsService } from 'src/app/services/utils.service';
import { Subject } from 'rxjs';
import { AccountService } from 'src/app/services/account.service';
import { AlertController } from '@ionic/angular';

@Component({
    selector: 'app-thread-add',
    templateUrl: './thread-add.page.html',
    styleUrls: ['./thread-add.page.scss'],
})
export class ThreadAddPage implements OnInit {
    client: Client = new Client();

    constructor(
        private localStorageService: LocalStorageService,
        private loadingService: LoadingService,
        private utilsService: UtilsService,
        private router: Router,
        private alertService: AlertService,
        private accountService: AccountService,
        public alertController: AlertController,
    ) { }

    ngOnInit() { };

    ionViewWillEnter() {
        this.client = this.accountService.get();
        this.accountService.doSubscribe().subscribe((resp: Client) => { this.client = resp; console.log(this.client); });
        console.log(this.client);
        // this.thread = this.testThread;
    }

    async confirm() {
        const alert = await this.alertController.create({
          header: 'Turno en supermercado',
          subHeader: 'Don Pepe',
          message: 'Horario : 8:15',
          buttons: ['Confirmar']
        });
    
        await alert.present();
      }
    

}
