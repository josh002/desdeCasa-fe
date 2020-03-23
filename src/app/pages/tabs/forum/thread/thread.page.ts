import { Component, OnInit, ViewChild } from '@angular/core';
import { LocalStorageService } from 'src/app/services/localStorageService';
import { ForumService } from 'src/app/services/forum.service';
import { LoadingService } from 'src/app/services/loadingService';
import { ActivatedRoute, Router, ParamMap, Params } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { Thread } from 'src/app/models/thread.model';
import { Comment } from 'src/app/models/comment.model';
import { AlertService } from 'src/app/services/alertService';
import { Account } from 'src/app/models/account.model';
import { AccountService } from 'src/app/services/account.service';

@Component({
    selector: 'app-thread',
    templateUrl: './thread.page.html',
    styleUrls: ['./thread.page.scss'],
})
export class ThreadPage implements OnInit {
    @ViewChild(IonContent, { static: false }) ionContent: IonContent;
    account: Account = new Account();
    thread: Thread;
    comments: Comment[];
    newComment: any = {
        content: '',
        threadId: null,
        userId: null,
    };

    constructor(
        private localStorageService: LocalStorageService,
        private forumService: ForumService,
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
