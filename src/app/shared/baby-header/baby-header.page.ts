import { Component, OnInit, Input } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { ImagesService } from 'src/app/services/images.service';
import { ActionSheetController } from '@ionic/angular';
import { BabyHeaderService } from './baby-headerService';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-baby-header',
    templateUrl: './baby-header.page.html',
    styleUrls: ['./baby-header.page.scss'],
})
export class BabyHeaderPage implements OnInit {
    client: Client;

    constructor(
        private localStorageService: LocalStorageService,
        private actionSheetController: ActionSheetController,
        private babyHeaderService: BabyHeaderService
    ) {
        babyHeaderService.pictureUpdated$.subscribe(
            () =>
                this.client = this.localStorageService.getObject('user')
        );
    }

    ngOnInit() {
        this.client = this.localStorageService.getObject('user');
        // console.log(`baby-header ngOnInit: ${this.client.picture}`);
    }

    ionViewWillEnter() {
        // Este metodo no es llamado ya que la pagina no llega por routing
        this.client = this.localStorageService.getObject('user');
        // console.log(`baby-header ionViewWillEnter: ${this.client.picture}`);
    }

    // Esta funcion es local, el this.client también, no afecta la localStorage
    onErrorImage = () => {
        console.log("baby-header.page: Image is not ok")
        // this.client.picture = "";
    }

    async presentActionSheet() {
        console.log("At least i called the method");

        const actionSheet = await this.actionSheetController.create({
            header: 'Compartir',
            buttons: [{
                text: 'Copiar',
                icon: 'copy',
                handler: () => {
                    console.log('Share Copy');
                }
            }, {
                text: 'Instagram',
                icon: 'logo-instagram',
                handler: () => {
                    console.log('Share Instgram');
                }
            }, {
                text: 'Facebook',
                icon: 'logo-facebook',
                handler: () => {
                    console.log('Share Facebook');
                }
            }, {
                text: 'Whatsapp',
                icon: 'logo-whatsapp',
                handler: () => {
                    console.log('Share Whatsapp');
                }
            }, {
                text: 'Cancel',
                icon: 'close',
                role: 'cancel',
                handler: () => {
                    console.log('Cancel clicked');
                }
            }]
        });
        await actionSheet.present();
    }

}
