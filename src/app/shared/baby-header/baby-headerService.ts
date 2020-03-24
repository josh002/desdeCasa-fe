import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from 'src/app/models/client.model';


@Injectable()
export class BabyHeaderService {
    // Observable sources
    private pictureUpdatedSource = new Subject<Client>();
    // Observable streams
    pictureUpdated$ = this.pictureUpdatedSource.asObservable();

    constructor() { };

    updatePicture() {
        this.pictureUpdatedSource.next();
    }

}
