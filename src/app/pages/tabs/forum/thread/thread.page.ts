import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { LoadingService } from 'src/app/services/loadingService';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { AlertService } from 'src/app/services/alertService';
import { AccountService } from 'src/app/services/account.service';
import { Client } from 'src/app/models/client.model';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.page.html',
    styleUrls: ['./thread.page.scss'],
})
export class ThreadPage implements OnInit {
    @ViewChild(IonContent, { static: false }) ionContent: IonContent;
    client: Client = new Client();
    comments: Comment[];
    newComment: any = {
        content: '',
        threadId: null,
        userId: null,
    };

    constructor(
        private localStorageService: LocalStorageService,
        private loadingService: LoadingService,
        private route: ActivatedRoute,
        private router: Router,
        private alertService: AlertService,
        private accountService: AccountService
    ) { }

    ngOnInit() {
       
    }
   
    onErrorImage = () => {
        console.log(`thread.img: Image is not ok`)
        // this.thread.img = '';
    }

    onErrorImage4Comments = (i: number) => {
        console.log(`thread[${i}].picture: Image is not ok`)
        // this.threads[i].picture = '';
    }
}
