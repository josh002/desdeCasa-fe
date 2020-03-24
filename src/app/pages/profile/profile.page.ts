import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { AlertController } from '@ionic/angular';

import { AuthService } from 'src/app/services/authService';

import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Observable, fromEvent } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { BabyHeaderService } from 'src/app/shared/baby-header/baby-headerService';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    client: Client = new Client();

    constructor(
        private localStorageService: LocalStorageService,
        private authService: AuthService,
        private router: Router,
        private babyHeaderService: BabyHeaderService,
        private accountService: AccountService,
        public alertController: AlertController
    ) { }

    ngOnInit() { }

    ionViewWillEnter() {
        this.client = this.accountService.get();        
        this.accountService.doSubscribe().subscribe((resp: Client) => { this.client = resp; console.log(this.client); });
    }

    onChangeImage = (e: any) => {
        const files = e && e.target && e.target.files;

        const fileReader = new FileReader();
        this.imageToBase64(fileReader, files[0])
            .subscribe(base64image => {
                // Editar usuario picture
                // this.client.picture = base64image;
                this.localStorageService.setObject('user', this.client);
                // Le aviso al servicio BabyHeader que la foto de perfil cambio
                this.babyHeaderService.updatePicture();
                this.authService.editUser(this.client)
                    .then(
                        (resp: any) => {
                            console.log(resp);
                        }
                    )
                    .catch(
                        resp => {
                            console.log(resp);
                        }
                    )
            });
    }

    onSearchImage = () => {
        document.getElementById('raised-button-file').click()
    }

    onErrorImage = () => {
        console.log("profile.page: Image is not ok")
        // this.client.picture = "";
    }

    imageToBase64(fileReader: FileReader, fileToRead: File): Observable<string> {
        fileReader.readAsDataURL(fileToRead);
        return fromEvent(fileReader, 'load').pipe(pluck('currentTarget', 'result'));
    }

    doLogOut() {
        this.localStorageService.clearLocalStorage();
        this.router.navigateByUrl('/start');
    }
    async cancelAlert() {
        const alert = await this.alertController.create({
          header: 'Cancelar turno',
          subHeader: 'Supermercado Don pepe',
          buttons: ['Si','No']
        });
    
        await alert.present();
      }
      async consultAlert() {
        const alert = await this.alertController.create({
          header: 'Turno en',
          subHeader: 'Supermercado Don pepe',
          buttons: ['Ok']
        });
    
        await alert.present();
      }
     
}