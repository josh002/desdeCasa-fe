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
        private accountService: AccountService
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

    onClickPublish = (e) => {
        e.preventDefault();
        this.thread.userId = +this.account.id;
        this.thread.politicalPartyId = this.politicalPartiesSelected.id;
        console.log(this.thread);
        this.forumService.createThread(this.thread)
            .then(
                resp => {
                    console.log(resp);
                    // En un insert exitoso reinicializo el thread cargado
                    this.thread = new Thread();
                    this.router.navigate(['/tabs/forum']);
                }
            )
            .catch(
                resp => {
                    console.log(resp.error);
                    return this.alertService.simpleAlert("Ocurrió un error inesperado. Intente nuevamente.");
                }
            )
    }


    onErrorImage = () => {
        console.log("profile.page: Image is not ok")
        this.account.picture = "";
    }

}
