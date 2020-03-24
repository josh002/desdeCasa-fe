import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { LoadingService } from 'src/app/services/loadingService';
import { PopoverController, IonInfiniteScroll } from '@ionic/angular';
import { AccountService } from 'src/app/services/account.service';
import { Client } from 'src/app/models/client.model';
import { UtilsService } from 'src/app/services/utils.service';

// Si disparo el infinite scroll con pocos threads se anexan abajo por duplicado los que ya están.
// Deberia utilizarlo con query offset

@Component({
    selector: 'app-forum',
    templateUrl: './forum.page.html',
    styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
    @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
    client: Client;
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
        private utilsService: UtilsService,
        private loadingService: LoadingService,
        private accountService: AccountService,
        public popoverController: PopoverController
    ) { }

    ngOnInit() {
        this.queryOffset = 0;
    }

    ionViewWillEnter() {
        this.client = this.accountService.get();
        this.accountService.doSubscribe().subscribe((resp: Client) => { this.client = resp; console.log(this.client); });
    }

    onErrorImage = (i: number) => {
        console.log(`thread[${i}].picture: Image is not ok`)
    }

}