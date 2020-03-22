import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    isLoading = false;

    constructor(
        public loadingController: LoadingController
    ) { }

    // Loader handling
    presentLoading(info: string): Promise<any> {
        this.isLoading = true;
        return this.loadingController.create({
            message: info
        })
            .then(
                (load: any) => {
                    return load.present();
                }
            );

    }

    dismissLoading() {
        this.isLoading = false;
        this.loadingController.dismiss()
            .then(() => console.log('LoadingService: dismissed'));
    }

}
