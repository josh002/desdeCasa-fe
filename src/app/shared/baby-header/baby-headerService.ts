import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable()
export class BabyHeaderService {
    // Observable sources
    private pictureUpdatedSource = new Subject<Account>();
    // Observable streams
    pictureUpdated$ = this.pictureUpdatedSource.asObservable();

    constructor() { };

    updatePicture() {
        this.pictureUpdatedSource.next();
    }

}
