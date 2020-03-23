import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/models/thread.model';
import { LoadingService } from 'src/app/services/loadingService';
import { ForumService } from 'src/app/services/forum.service';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { Category } from 'src/app/models/category.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alertService';
import { PoliticalParty } from 'src/app/models/politicalParty.model';
import { Account } from 'src/app/models/account.model';
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
    account: Account = new Account();
    politicalParties: PoliticalParty[];
    politicalPartiesSelected: PoliticalParty;
    thread = new Thread();

    testThread: Thread = {
        userId: undefined,
        subject: `Tema N°${Math.floor(Math.random() * (1000 - 1) + 1)}`,
        content: `Descripcion sobre el topico que arriba se menciona`,
        politicalPartyId: undefined,
    };

    constructor(
        private localStorageService: LocalStorageService,
        private loadingService: LoadingService,
        private forumService: ForumService,
        private utilsService: UtilsService,
        private router: Router,
        private alertService: AlertService,
        private accountService: AccountService,
        public alertController: AlertController,
    ) { }

    ngOnInit() { };

    ionViewWillEnter() {
        this.account = this.accountService.get();
        this.accountService.doSubscribe().subscribe((resp: Account) => { this.account = resp; console.log(this.account); });
        console.log(this.account);
        // this.thread = this.testThread;
        this.utilsService.getPoliticalParty()
            .then((resp: any) => { this.politicalParties = resp.result; })
            .catch(err => { console.log(err); })
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
