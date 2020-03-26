import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpHeaders, HttpClient } from '@angular/common/http';
import { appJsonHeader } from '../constants/constants';

@Injectable({
    providedIn: 'root'
})
export class UtilsService {

    constructor(
        private httpClient: HttpClient
    ) { }

    areYouThere = () =>
        this.httpClient.get(`${environment.WS_URL}/are-you-there`).toPromise()

    /**
     * Dadas cords latitud y longitud, retorna a un address
     */
    cordsToAddress = (cords: { latitude: number, longitude: number }): Promise<{ formatted_address: string }> =>
        this.httpClient.post(`${environment.WS_URL}/utils/cord-to-address`, cords, appJsonHeader)
            .toPromise()
            .then((resp: any) => resp.result)
            .catch((err: any) => {console.log('err', err); return err});

}
