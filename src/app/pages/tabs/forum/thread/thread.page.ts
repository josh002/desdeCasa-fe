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
        this.account = this.accountService.get();
        this.accountService.doSubscribe().subscribe((resp: Account) => { this.account = resp; console.log(this.account); });
        this.loadingService.presentLoading("Cargando")
            .then(
                (r: any) => {
                    let threadId: number;
                    this.route.paramMap.subscribe(
                        (params: Params) => {
                            this.forumService.getThread({id: params.params.id})
                                .then(
                                    (resp: any) => {
                                        // resp.result.map((r: any) => { if (r.picture) r.picture = r.picture.data.map(a => String.fromCharCode(a)).join(''); })
                                        this.thread = resp.result[0];
                                        {
                                            this.newComment.threadId = this.thread.id;
                                            this.newComment.userId = +this.account.id;
                                        }
                                        this.loadingService.dismissLoading();
                                        console.log(this.thread);
                                    })
                                .catch(
                                    err => {
                                        this.loadingService.dismissLoading();
                                        console.log(err);
                                    })
                            this.forumService.getPost(params.params.id)
                                .then(
                                    (resp: any) => {
                                        // resp.result.map((r: any) => { if (r.picture) r.picture = r.picture.data.map(a => String.fromCharCode(a)).join(''); })
                                        this.comments = resp.result;
                                        console.log(this.comments);
                                    })
                                .catch(
                                    err => {
                                        console.log(err);
                                    })
                        })
                })
    }

    doComment() {
        this.alertService.simpleAlert("Funcion no disponible aún");

        return
        // this.forumService.createPost(this.newComment)
        //     .then(
        //         resp => {
        //             const tempPush = Object.assign({}, this.newComment);
        //             tempPush.picture = this.account.picture;
        //             tempPush.user = this.account.username;
        //             this.comments.push(tempPush);
        //             this.newComment.content = '';
        //             this.ionContent.scrollToBottom();
        //             console.log(tempPush);
        //             console.log(resp);
        //         })
        //     .catch(
        //         err => {
        //             console.log(err);
        //             return this.alertService.simpleAlert("Algo salió mal, intenta nuevamente");
        //         })

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
