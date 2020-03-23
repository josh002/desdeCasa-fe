import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { ForumService } from 'src/app/services/forum.service';
import { LoadingService } from 'src/app/services/loadingService';
import { PopoverController, IonInfiniteScroll } from '@ionic/angular';
import { Thread } from 'src/app/models/thread.model';
import { PoliticalParty } from 'src/app/models/politicalParty.model';
import { AccountService } from 'src/app/services/account.service';
import { Account } from 'src/app/models/account.model';
import { UtilsService } from 'src/app/services/utils.service';
import { PopoverSelectComponent } from 'src/app/shared/popover-select/popover-select.component';

// Si disparo el infinite scroll con pocos threads se anexan abajo por duplicado los que ya están.
// Deberia utilizarlo con query offset

@Component({
    selector: 'app-forum',
    templateUrl: './forum.page.html',
    styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
    @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
    account: Account;
    threads: Thread[] = [];
    politicalParties: PoliticalParty[] = [];
    politicalParty: string;
    // SQL Query Parameters
    querySearch: string;
    queryId: number;
    queryPoliticalPartyId: number;
    queryOffset: number;
    queryOrderBy: string;
    mostrarForo: boolean = false;

    repliesMock: number[] = [];

    constructor(
        private localStorageService: LocalStorageService,
        private forumService: ForumService,
        private utilsService: UtilsService,
        private loadingService: LoadingService,
        private accountService: AccountService,
        public popoverController: PopoverController
    ) { }

    ngOnInit() {
        this.queryOffset = 0;
        this.utilsService.getPoliticalParty()
            .then(
                (resp: any) => { this.politicalParties = resp.result; })
            .catch(
                err => { console.log(err); })
    }

    ionViewWillEnter() {
       
    
        this.account = this.accountService.get();
        this.accountService.doSubscribe().subscribe((resp: Account) => { this.account = resp; console.log(this.account); });
    }

    onErrorImage = (i: number) => {
        console.log(`thread[${i}].picture: Image is not ok`)
    }

    getPoliticalPartyName(politicalPartyId: number) {
        return this.politicalParties.filter(elem => elem.id == politicalPartyId)[0].name
    } 

    randomNumberGenerator(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    

   

    async presentPopover() {

        const popover = await this.popoverController.create({
            component: PopoverSelectComponent,
            translucent: true,
            componentProps: {
                'options': this.politicalParties
            },
            cssClass: 'eon6-ion-popover'
        });

        popover.onDidDismiss()
            .then((result) => {
                console.log(result.data);
                if (result.data != undefined) {
                    this.queryPoliticalPartyId = result.data.id;
                    this.politicalParty = result.data.name;
                    this.queryOffset = 0;                   
                }
            });

        return await popover.present();
    }
}